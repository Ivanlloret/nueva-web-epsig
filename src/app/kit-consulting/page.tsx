import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { kitConsultingServices, kitConsultingTiers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kit Consulting",
  description:
    "Bono de Asesoramiento Digital de hasta 24.000€ financiado por Next Generation EU. Gestionamos tu Kit Consulting como Agente Digital Autorizado.",
};

export default function KitConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Financiación pública · Agente Digital Autorizado"
        title="Kit Consulting: hasta 24.000 € para digitalizar tu empresa"
        lead="Un Bono de Asesoramiento Digital del Gobierno de España, financiado con fondos Next Generation EU, para empresas de entre 10 y 249 empleados."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            <p>
              El programa Kit Consulting, dentro del Plan de Recuperación, Transformación y
              Resiliencia, financia la contratación de servicios de asesoramiento
              especializados en transformación digital, ventas online, mejora de procesos,
              inteligencia artificial y rendimiento empresarial. Como Agente Digital
              Autorizado, gestionamos tu solicitud de principio a fin.
            </p>
          </Reveal>

          <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {kitConsultingTiers.map((tier, index) => (
              <Reveal key={tier.range} delay={index * 0.08}>
                <TiltCard className="rounded-brand border border-line bg-surface-alt p-6 text-center">
                  <span className="block font-mono text-2xl font-semibold text-primary">
                    {tier.amount}
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-soft">{tier.range}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <SectionHeading
            eyebrow="Bono de asesoramiento"
            title="¿En qué servicios puedes usar tu bono?"
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {kitConsultingServices.map((service, index) => (
              <Reveal key={service.slug} className="h-full" delay={(index % 4) * 0.07}>
                <TiltCard
                  href={`/kit-consulting/${service.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6.5 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16.5px]">{service.title}</h3>
                  <p className="flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Ver más →
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Quieres saber si tu empresa puede acceder al Kit Consulting?"
        body="Comprobamos tu elegibilidad y gestionamos toda la solicitud del bono."
        ctaLabel="Consultar mi bono"
      />
    </>
  );
}
