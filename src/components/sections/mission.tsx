import Reveal from "@/components/reveal";

export default function Mission() {
  return (
    <section className="bg-surface-alt py-20 text-center sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-6">
        <p className="font-display text-[26px] font-semibold leading-[1.35] text-ink sm:text-[32px]">
          Ayudamos a las empresas a{" "}
          <span className="text-primary">mejorar su gestión</span>,{" "}
          <span className="text-primary">digitalizar sus procesos</span> y{" "}
          <span className="text-accent">proteger su negocio</span>.
        </p>
        <small className="mt-5.5 block font-mono text-[13px] tracking-wide text-ink-soft">
          ESTE ES EL PORQUÉ DETRÁS DE CADA SERVICIO DE EPSIG
        </small>
      </Reveal>
    </section>
  );
}
