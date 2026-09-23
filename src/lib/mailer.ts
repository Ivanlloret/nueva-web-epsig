import "server-only";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  privacyAcceptedAt: Date;
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
    [
      "Privacidad",
      `Aceptada el ${request.privacyAcceptedAt.toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
    ],
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

// Solo el nombre de pila, recortado: nunca se reenvía contenido libre del formulario,
// para que el acuse de recibo no sirva para mandar spam a terceros.
function firstName(name: string) {
  const first = singleLine(name).split(/\s+/)[0] ?? "";
  const clean = first.replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 30);
  return clean || undefined;
}

export async function sendContactConfirmation(request: ContactRequest) {
  const from = process.env.CONTACT_FROM ?? requiredEnv("SMTP_USER");
  const greeting = firstName(request.name) ? `Hola, ${firstName(request.name)}:` : "Hola:";
  const phones = site.phones.join(" · ");

  const text = [
    greeting,
    "",
    `Gracias por contactar con ${site.name}. Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en un plazo de 24 a 48 horas laborables.`,
    "",
    `Si es urgente, puedes llamarnos al ${phones}, de lunes a viernes por la mañana.`,
    "",
    "Un saludo,",
    `El equipo de ${site.name}`,
    site.url,
    "",
    "---",
    `Recibes este correo porque se ha enviado el formulario de contacto de ${site.url} con esta dirección. Si no has sido tú, ignóralo: no volveremos a escribirte. Responsable del tratamiento: ${site.legalName}. Más información: ${site.url}/politica-de-privacidad/`,
  ].join("\n");

  const html = `
  <div style="background:#f2f5fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <tr><td style="padding:28px 32px 8px"><img src="cid:logo-epsig" width="180" height="50" alt="${site.name}" style="display:block;border:0"></td></tr>
      <tr><td style="padding:16px 32px 8px;color:#0b1220;font-size:15px;line-height:1.6">
        <p style="margin:0 0 14px">${escapeHtml(greeting)}</p>
        <p style="margin:0 0 14px">Gracias por contactar con <strong>${site.name}</strong>. Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en un plazo de <strong>24 a 48 horas laborables</strong>.</p>
        <p style="margin:0 0 14px">Si es urgente, puedes llamarnos al <strong>${phones}</strong>, de lunes a viernes por la mañana.</p>
        <p style="margin:0 0 4px">Un saludo,</p>
        <p style="margin:0">El equipo de ${site.name}</p>
      </td></tr>
      <tr><td style="padding:20px 32px 28px">
        <a href="${site.url}" style="display:inline-block;background:#0b1220;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;padding:11px 22px;border-radius:999px">Visitar la web</a>
      </td></tr>
      <tr><td style="padding:18px 32px;background:#f2f5fb;color:#8c98ad;font-size:11.5px;line-height:1.5">
        ${site.legalName} · ${escapeHtml(site.registeredAddress)} · ${site.email}<br><br>
        Recibes este correo porque se ha enviado el formulario de contacto de nuestra web con esta dirección. Si no has sido tú, ignóralo: no volveremos a escribirte.
        Responsable del tratamiento: ${site.legalName}. <a href="${site.url}/politica-de-privacidad/" style="color:#8c98ad">Política de privacidad</a>.
      </td></tr>
    </table>
  </div>`;

  await getTransporter().sendMail({
    from: { name: site.name, address: from },
    to: singleLine(request.email),
    replyTo: site.email,
    subject: `Hemos recibido tu mensaje — ${site.name}`,
    // Evita respuestas automáticas en bucle (fuera de oficina, etc.).
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
    text,
    html,
    attachments: [
      {
        filename: "logo-epsig.png",
        path: path.join(process.cwd(), "public/email/logo-epsig.png"),
        cid: "logo-epsig",
      },
    ],
  });
}
