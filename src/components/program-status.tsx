import Link from "next/link";

/**
 * Aviso de convocatoria cerrada para Kit Digital / Kit Consulting.
 * Cuando se abra una nueva convocatoria, basta con cambiar `open` a true en `programStatus` (site.ts).
 */
export default function ProgramStatus({
  program,
  open,
  compact = false,
}: {
  program: string;
  open: boolean;
  compact?: boolean;
}) {
  if (open) return null;
  return (
    <div
      className={`flex flex-col gap-3 rounded-brand border border-chip-amber/40 bg-[#fdf6e9] text-left sm:flex-row sm:items-center sm:justify-between ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="h-2 w-2 shrink-0 rounded-full bg-chip-amber" aria-hidden />
          Convocatoria de {program} cerrada
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
          Ahora mismo no se admiten nuevas solicitudes. Puedes contratar estos servicios
          directamente con nosotros y te avisamos en cuanto se abra una nueva convocatoria.
        </p>
      </div>
      <Link
        href="/contacto#diagnostico"
        className="shrink-0 self-start rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary sm:self-center"
      >
        Avisadme
      </Link>
    </div>
  );
}
