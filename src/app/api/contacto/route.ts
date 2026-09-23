import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email)) {
    return NextResponse.json({ error: "El correo electrónico no es válido." }, { status: 400 });
  }

  // No email provider is configured yet: this only logs server-side.
  // Wire a provider (e.g. Resend, Postmark, SMTP) here before launch so
  // submissions actually reach info@epsigconsultores.com.
  console.log("[contacto] Nueva solicitud recibida:", {
    name: body.name,
    email: body.email,
    phone: typeof body.phone === "string" ? body.phone : undefined,
    company: typeof body.company === "string" ? body.company : undefined,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
