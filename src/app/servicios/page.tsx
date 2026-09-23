import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Consultoría empresarial, transformación digital e implantación de Odoo ERP, y protección del negocio con ciberseguridad gestionada.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Tres formas de ayudarte a funcionar mejor"
        lead="Consultoría, digitalización y protección — nunca por separado. Cada proyecto se diseña a partir de dónde está tu empresa hoy."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={index * 0.08}>
                <TiltCard
                  href={`/servicios/${pillar.slug}`}
                  className="group block h-full rounded-brand border border-line bg-surface p-8 transition-colors hover:border-primary-light"
                >
                  <div
                    className="mb-5 flex h-11.5 w-11.5 items-center justify-center rounded-xl font-mono text-[13px] font-medium text-white"
                    style={{ background: pillar.color }}
                  >
                    {pillar.code}
                  </div>
                  <h3 className="mb-2.5 text-xl">{pillar.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">
                    {pillar.summary}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Ver servicio →
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 rounded-brand border border-line bg-surface-alt p-8 sm:p-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  Servicio estrella
                </span>
                <h3 className="mt-3 text-xl">Odoo ERP, implantado de principio a fin</h3>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
                  Diagnóstico, configuración, migración de datos, formación del equipo y
                  soporte continuo — el hilo conductor que conecta las otras tres áreas.
                </p>
              </div>
              <Link
                href="/servicios/odoo"
                className="shrink-0 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary"
              >
                Descubrir Odoo ERP
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Financiación pública
            </div>
            <h2 className="mt-3 text-[28px]">
              Como Agente Digital Autorizado, gestionamos tu subvención
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Reveal>
              <TiltCard
                href="/kit-digital"
                className="group block h-full rounded-brand border border-line bg-surface p-7 transition-colors hover:border-primary-light"
              >
                <h3 className="mb-2 text-lg">Kit Digital</h3>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  Web, comercio electrónico, CRM, ciberseguridad y más soluciones
                  digitales subvencionadas para tu pyme.
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Ver categorías →
                </span>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.08}>
              <TiltCard
                href="/kit-consulting"
                className="group block h-full rounded-brand border border-line bg-surface p-7 transition-colors hover:border-primary-light"
              >
                <h3 className="mb-2 text-lg">Kit Consulting</h3>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  Bono de asesoramiento digital de hasta 24.000 € para empresas de 10 a
                  249 empleados.
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Ver bono →
                </span>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
