import { NextResponse } from "next/server";
import { sendContactEmail, type ContactRequest } from "@/lib/mailer";

const limits = { name: 120, email: 200, phone: 40, company: 160, message: 5000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseRequest(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

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

  return NextResponse.json({ ok: true });
}
