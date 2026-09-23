import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { kitDigitalCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kit Digital",
  description:
    "Programa Kit Digital del Gobierno de España para digitalizar tu pyme: web, comercio electrónico, CRM, ciberseguridad y más, gestionado por EPSIG como Agente Digital Autorizado.",
};

export default function KitDigitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Financiación pública · Agente Digital Autorizado"
        title="Kit Digital: soluciones digitales subvencionadas para tu pyme"
        lead="Una iniciativa del Gobierno de España, cofinanciada por los fondos Next Generation EU, para dar un salto real en la madurez digital de tu empresa."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Categorías"
            title="Nuestros servicios dentro del catálogo Kit Digital"
            body="Cada categoría tiene su propia subvención y proveedores homologados — te ayudamos a elegir la combinación adecuada para tu negocio."
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kitDigitalCategories.map((cat, index) => (
              <Reveal key={cat.slug} className="h-full" delay={(index % 3) * 0.08}>
                <TiltCard
                  href={`/kit-digital/${cat.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16px]">{cat.title}</h3>
                  <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                    {cat.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12.5px] font-semibold text-accent">
                      {cat.priceFrom}
                    </span>
                    <span className="text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ver más →
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink-faint">
            Precios orientativos, IVA no incluido — la cuantía final depende del segmento
            de empresa y de los puestos de trabajo a digitalizar.
          </p>
        </div>
      </section>

      <CtaBand
        title="¿Quieres saber cuánto Kit Digital te corresponde?"
        body="Comprobamos tu segmento y gestionamos toda la solicitud, de principio a fin."
        ctaLabel="Consultar mi Kit Digital"
      />
    </>
  );
}
