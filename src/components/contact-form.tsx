"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Momento en que se carga el formulario (trampa de tiempo anti-bots).
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      elapsed: startedAt.current ? Date.now() - startedAt.current : 0,
    };

    try {
      const res = await fetch("/api/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "No se pudo enviar el formulario.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ha ocurrido un error inesperado.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-brand border border-accent/30 bg-accent-pale p-8 text-center"
      >
        <h3 className="mb-2 text-lg font-semibold text-ink">¡Gracias! Hemos recibido tu mensaje.</h3>
        <p className="text-sm text-ink-soft">
          Te contactaremos en breve a la dirección que nos has indicado.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Campo trampa: invisible para personas, los bots lo rellenan. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          No rellenes este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" required />
        <Field label="Correo electrónico" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Teléfono" name="phone" />
        <Field label="Empresa" name="company" />
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Cuéntanos qué necesitas
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
        />
      </label>

      <label className="flex items-start gap-3 text-[13.5px] leading-snug text-ink-soft">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          He leído y acepto la{" "}
          <Link href="/politica-de-privacidad" target="_blank" className="font-medium text-primary hover:underline">
            política de privacidad
          </Link>
          . <span className="text-accent">*</span>
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 self-start rounded-full bg-ink px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
      </motion.button>

      <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
        <strong className="font-semibold text-ink-soft">Información básica sobre protección de datos.</strong>{" "}
        Responsable: {site.legalName}. Finalidad: atender tu solicitud de información o
        diagnóstico. Legitimación: tu consentimiento. Destinatarios: no se ceden datos a
        terceros, salvo obligación legal. Derechos: acceso, rectificación, supresión y otros
        derechos, escribiendo a {site.email}. Más información en la{" "}
        <Link href="/politica-de-privacidad" className="underline hover:text-primary">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
      <span>
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
