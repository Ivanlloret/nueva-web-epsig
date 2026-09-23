import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Próximamente: artículos sobre Odoo ERP, digitalización, Kit Digital y ciberseguridad para pymes.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Estamos preparando el blog"
        lead="Aquí publicaremos artículos prácticos sobre Odoo ERP, digitalización, financiación (Kit Digital / Kit Consulting) y ciberseguridad para pymes."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-xl rounded-[22px] border-[1.5px] border-dashed border-primary-light bg-surface p-9 text-center sm:p-11">
            <h3 className="mb-2.5 text-[22px]">Todavía no hay artículos publicados</h3>
            <p className="mb-5.5 leading-relaxed text-ink-soft">
              Si tienes una duda concreta sobre Odoo, digitalización o ciberseguridad,
              escríbenos directamente — puede que sea el tema de nuestro primer artículo.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-full border-[1.5px] border-line px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:border-ink"
            >
              Contactar
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
