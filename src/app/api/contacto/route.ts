import { NextResponse } from "next/server";
import { sendContactConfirmation, sendContactEmail, type ContactRequest } from "@/lib/mailer";
import { clientIp, hit } from "@/lib/rate-limit";

const limits = { name: 120, email: 200, phone: 40, company: 160, message: 5000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 20_000;
// Una persona tarda más que esto en rellenar el formulario; un bot, no.
const MIN_FILL_MS = 3_000;
const PER_IP = { limit: 5, windowMs: 10 * 60_000 };
const GLOBAL = { limit: 30, windowMs: 60 * 60_000 };

const tooMany = () =>
  NextResponse.json(
    { error: "Has enviado demasiadas solicitudes. Inténtalo de nuevo en unos minutos o llámanos." },
    { status: 429 },
  );

// Solo se aceptan envíos hechos desde la propia web.
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Campo trampa relleno o envío instantáneo: es un bot.
function looksLikeBot(data: Record<string, unknown>) {
  if (typeof data.website === "string" && data.website.trim() !== "") return true;
  const elapsed = Number(data.elapsed);
  return !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;
}

function optionalField(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function parseRequest(body: unknown): ContactRequest | string {
  if (!body || typeof body !== "object") return "Faltan campos obligatorios.";
  const data = body as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !message) return "Faltan campos obligatorios.";
  if (data.privacy !== "on" && data.privacy !== true) {
    return "Debes aceptar la política de privacidad para enviar el formulario.";
  }
  if (name.length > limits.name || email.length > limits.email || message.length > limits.message) {
    return "Alguno de los campos es demasiado largo.";
  }
  if (!emailPattern.test(email)) return "El correo electrónico no es válido.";

  return {
    name,
    email,
    message,
    phone: optionalField(data.phone, limits.phone),
    company: optionalField(data.company, limits.company),
    privacyAcceptedAt: new Date(),
  };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
  }

  if (!hit(`ip:${clientIp(request)}`, PER_IP.limit, PER_IP.windowMs)) return tooMany();

  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "La solicitud es demasiado grande." }, { status: 413 });
  }
  let body: unknown = null;
  try {
    body = JSON.parse(raw);
  } catch {
    // Se trata como cuerpo vacío.
  }

  // A los bots se les responde como si todo hubiera ido bien, para no darles pistas.
  if (body && typeof body === "object" && looksLikeBot(body as Record<string, unknown>)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseRequest(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  if (!hit("global", GLOBAL.limit, GLOBAL.windowMs)) return tooMany();

  try {
    await sendContactEmail(parsed);
  } catch (err) {
    // No se registran los datos del formulario (RGPD), solo el fallo técnico.
    console.error("[contacto] Error enviando el correo:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "No hemos podido enviar tu mensaje. Escríbenos a info@epsigconsultores.com o llámanos." },
      { status: 500 },
    );
  }

  // El acuse de recibo es secundario: si falla, la solicitud ya ha llegado a info@.
  try {
    await sendContactConfirmation(parsed);
  } catch (err) {
    console.error("[contacto] Error enviando el acuse de recibo:", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ ok: true });
}
