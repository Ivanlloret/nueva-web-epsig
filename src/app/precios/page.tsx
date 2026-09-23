import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { kitDigitalCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios orientativos de nuestros servicios (IVA no incluido). El precio final depende del alcance de cada proyecto.",
};

export default function PreciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Precios"
        title="Precios orientativos, sin sorpresas"
        lead="Todos los precios son sin IVA. El importe final depende de variables como los puestos de trabajo, los datos a tratar y la duración del proyecto — por eso siempre empezamos con un diagnóstico gratuito."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            <p>
              No publicamos una tarifa cerrada porque cada proyecto es distinto. Como
              referencia, estos son los precios orientativos de nuestros servicios
              dentro del programa Kit Digital:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kitDigitalCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kit-digital/${cat.slug}`}
                className="flex min-w-0 flex-col gap-2 rounded-brand border border-line bg-surface-alt px-5 py-4 transition-colors hover:border-primary-light"
              >
                <span className="text-[14px] font-medium leading-snug text-ink">{cat.title}</span>
                <span className="break-words font-mono text-[12.5px] font-semibold leading-snug text-primary">
                  {cat.priceFrom}
                </span>
              </Link>
            ))}
          </div>

          <Reveal className="mx-auto mt-14 max-w-xl rounded-brand border-[1.5px] border-dashed border-primary-light bg-surface p-8 text-center">
            <h3 className="mb-2 text-lg">¿Consultoría, Odoo o ciberseguridad?</h3>
            <p className="mb-5 text-[14.5px] leading-relaxed text-ink-soft">
              Estos servicios se cotizan por proyecto. Pídenos un diagnóstico gratuito y
              te damos un presupuesto cerrado antes de empezar.
            </p>
            <Link
              href="/contacto#diagnostico"
              className="inline-block rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary"
            >
              Pedir presupuesto
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
