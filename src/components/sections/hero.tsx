"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SystemPanel from "@/components/system-panel";
import Reveal from "@/components/reveal";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-surface-dark pt-24 text-white sm:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="blob-drift pointer-events-none absolute -right-30 -top-40 h-[520px] w-[520px] rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle, rgba(34,73,199,.55), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="blob-drift-slow pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,.28), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Partner oficial Odoo · Agente Digital Autorizado
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 mb-5.5 text-[38px] leading-[1.12] text-white sm:text-[48px]">
              El sistema que ayuda a tu empresa a{" "}
              <em className="text-accent not-italic">funcionar mejor.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-8.5 max-w-[46ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y La
              Safor a gestionar, digitalizar y proteger su negocio — en un solo sitio, no en
              tres proveedores distintos.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="flex flex-wrap gap-3.5">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contacto#diagnostico"
                className="inline-block rounded-full bg-accent px-6.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(16,185,129,.6)] transition-opacity hover:opacity-90"
              >
                Solicita un diagnóstico gratuito
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/servicios/odoo"
                className="inline-block rounded-full border-[1.5px] border-white/25 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/50"
              >
                Cómo implantamos Odoo →
              </Link>
            </motion.div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.15}>
          <SystemPanel />
        </Reveal>
      </div>
    </header>
  );
}
