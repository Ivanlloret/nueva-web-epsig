import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import { pillars } from "@/lib/site";

export default function Pillars() {
  return (
    <section id="pilares" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Tres formas de ayudarte a funcionar mejor"
            body="Ninguna vive aislada: cada proyecto de Odoo puede apoyarse en las tres."
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
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
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{pillar.summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                  Saber más →
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
