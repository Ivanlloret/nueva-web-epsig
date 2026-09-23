import Reveal from "@/components/reveal";
import { site } from "@/lib/site";

export default function Zone() {
  return (
    <section className="py-20 text-center sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-6">
        <div className="inline-flex items-center justify-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Zona de actuación
        </div>
        <h2 className="mt-3 text-[32px]">Trabajamos cerca de ti</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {site.zones.map((zone) => (
            <span
              key={zone}
              className="rounded-full border border-line bg-surface-alt px-5 py-2.5 text-[13px] font-semibold"
            >
              {zone}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
