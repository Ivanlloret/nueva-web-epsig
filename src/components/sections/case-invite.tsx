import Link from "next/link";
import Reveal from "@/components/reveal";

export default function CaseInvite() {
  return (
    <section id="casos" className="bg-surface-alt py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          className="mx-auto max-w-xl rounded-[22px] border-[1.5px] border-dashed border-primary-light bg-surface p-9 text-center sm:p-11"
        >
          <h3 className="mb-2.5 text-[22px]">Sé uno de nuestros primeros proyectos Odoo</h3>
          <p className="mb-5.5 leading-relaxed text-ink-soft">
            Estamos documentando nuestras primeras implantaciones en la Marina Alta. Si
            empiezas ahora, tu caso puede ser el primero en aparecer aquí.
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
  );
}
