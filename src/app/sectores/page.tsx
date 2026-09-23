import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { sectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sectores",
  description:
    "Odoo ERP y consultoría adaptados a industria, comercio, servicios y hostelería en la Marina Alta, Valencia y La Safor.",
};

export default function SectoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectores"
        title="Adaptado al día a día de tu negocio"
        lead="Odoo se configura distinto según el sector — no imponemos un molde único."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sectors.map((sector, index) => (
              <Reveal key={sector.id} delay={index * 0.08}>
                <TiltCard
                  id={sector.id}
                  className={`scroll-mt-24 rounded-brand border p-8 ${
                    sector.highlight
                      ? "border-primary-light bg-primary-pale"
                      : "border-line bg-surface"
                  }`}
                >
                  <h3 className="mb-2.5 text-xl">{sector.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{sector.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Tu sector no está en la lista?"
        body="Odoo se adapta a casi cualquier tipo de negocio — hablamos de tu caso concreto."
      />
    </>
  );
}
