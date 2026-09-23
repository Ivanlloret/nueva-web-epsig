import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Estamos documentando nuestras primeras implantaciones de Odoo ERP en la Marina Alta. Sé de los primeros en aparecer aquí.",
};

export default function CasosDeExitoPage() {
  return (
    <>
      <PageHero
        eyebrow="Casos de éxito"
        title="Sé uno de nuestros primeros proyectos Odoo"
        lead="Estamos documentando nuestras primeras implantaciones en la Marina Alta, Valencia y La Safor."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-xl rounded-[22px] border-[1.5px] border-dashed border-primary-light bg-surface p-9 text-center sm:p-11">
            <h3 className="mb-2.5 text-[22px]">Todavía no hay casos publicados</h3>
            <p className="mb-5.5 leading-relaxed text-ink-soft">
              Preferimos no inventar cifras ni testimonios: en cuanto cerremos las
              primeras implantaciones, con permiso del cliente, las publicaremos aquí con
              detalle real. Si empiezas ahora, tu proyecto puede ser el primero.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-full border-[1.5px] border-line px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:border-ink"
            >
              Quiero ser caso de éxito
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
