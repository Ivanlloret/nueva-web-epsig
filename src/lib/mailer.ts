import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Evita inyección de cabeceras en asunto / reply-to.
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

let transporter: Transporter | undefined;

// Sin SMTP_USER se envía sin autenticar: sirve para "Direct Send" de Microsoft 365
// (entrega directa al MX del dominio, solo a buzones propios).
function getTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  transporter ??= nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    requireTLS: true,
    auth: user ? { user, pass: requiredEnv("SMTP_PASS") } : undefined,
  });
  return transporter;
}

export async function sendContactEmail(request: ContactRequest) {
  const from = process.env.CONTACT_FROM ?? requiredEnv("SMTP_USER");
  const to = requiredEnv("CONTACT_TO");
  const name = singleLine(request.name);

  const rows: [string, string | undefined][] = [
    ["Nombre", request.name],
    ["Correo", request.email],
    ["Teléfono", request.phone],
    ["Empresa", request.company],
  ];

  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    request.message,
  ].join("\n");

  const html = `
    <h2 style="font-family:sans-serif">Nueva solicitud desde la web</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${k}</strong></td><td style="padding:4px 0">${escapeHtml(v!)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;color:#555"><strong>Mensaje</strong></p>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(request.message)}</p>
  `;

  await getTransporter().sendMail({
    from: { name: "Web EPSIG", address: from },
    to,
    replyTo: { name, address: singleLine(request.email) },
    subject: `Nueva solicitud web: ${name}${request.company ? ` (${singleLine(request.company)})` : ""}`,
    text,
    html,
  });
}
