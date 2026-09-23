// Maqueta ilustrativa del panel del software de camping (datos de ejemplo). Solo CSS/SVG.
type Plot = { id: string; state: "on" | "free" | "low"; kwh?: number };

const plots: Plot[] = [
  { id: "P-01", state: "on", kwh: 12.4 },
  { id: "P-02", state: "on", kwh: 8.1 },
  { id: "P-03", state: "free" },
  { id: "P-04", state: "low", kwh: 0.6 },
  { id: "P-05", state: "on", kwh: 15.2 },
  { id: "P-06", state: "free" },
  { id: "P-07", state: "on", kwh: 4.9 },
  { id: "P-08", state: "on", kwh: 9.7 },
  { id: "P-09", state: "low", kwh: 1.1 },
  { id: "P-10", state: "on", kwh: 6.3 },
  { id: "P-11", state: "free" },
  { id: "P-12", state: "on", kwh: 11.8 },
];

const week = [38, 52, 45, 61, 74, 88, 69];
const days = ["L", "M", "X", "J", "V", "S", "D"];

const stateStyle = {
  on: { dot: "bg-accent", ring: "border-accent/40", label: "Conectada" },
  low: { dot: "bg-[#f5b14c]", ring: "border-[#f5b14c]/50", label: "Saldo bajo" },
  free: { dot: "bg-white/25", ring: "border-white/10", label: "Libre" },
} as const;

export default function CampingDashboard() {
  const max = Math.max(...week);
  return (
    <div
      className="rounded-panel border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] backdrop-blur-md sm:p-6"
      role="img"
      aria-label="Vista ilustrativa del panel: estado de cada parcela, consumo eléctrico semanal, tickets de electricidad y caja del día."
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-mist-soft">camping · panel de parcelas</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
          en directo
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr]">
        {/* Parcelas */}
        <div className="grid grid-cols-4 gap-2">
          {plots.map((plot) => {
            const style = stateStyle[plot.state];
            return (
              <div key={plot.id} className={`rounded-xl border ${style.ring} bg-white/[0.03] px-2 py-2.5`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] font-semibold text-white">{plot.id}</span>
                  <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                </div>
                <span className="mt-1.5 block font-mono text-[10px] text-mist-soft">
                  {plot.kwh !== undefined ? `${plot.kwh.toFixed(1)} kWh` : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Consumo semanal + caja */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-[11px] font-semibold text-mist">Consumo semanal</span>
              <span className="font-mono text-[10px] text-mist-faint">kWh · orientativo</span>
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {week.map((value, index) => (
                <div key={days[index]} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-[4px] bg-gradient-to-t from-primary to-mist-accent"
                    style={{ height: `${(value / max) * 64}px` }}
                  />
                  <span className="font-mono text-[9px] text-mist-faint">{days[index]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="block text-[10.5px] text-mist-soft">Check-ins hoy</span>
              <span className="font-display text-xl font-semibold text-white">14</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="block text-[10.5px] text-mist-soft">Caja del día</span>
              <span className="font-display text-xl font-semibold text-white">1.284 €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03]">
        {[
          ["#0342", "P-07", "10 kWh", "Activo", "text-accent"],
          ["#0341", "P-04", "5 kWh", "Casi agotado", "text-[#f5b14c]"],
          ["#0339", "P-12", "20 kWh", "Activo", "text-accent"],
        ].map(([ticket, plot, amount, status, color], index) => (
          <div
            key={ticket}
            className={`grid grid-cols-4 items-center px-3.5 py-2 font-mono text-[10.5px] ${index ? "border-t border-white/5" : ""}`}
          >
            <span className="text-mist">Ticket {ticket}</span>
            <span className="text-mist-soft">{plot}</span>
            <span className="text-mist-soft">{amount}</span>
            <span className={`text-right ${color}`}>{status}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[10.5px] text-mist-soft">
        {Object.values(stateStyle).map((style) => (
          <span key={style.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${style.dot}`} />
            {style.label}
          </span>
        ))}
      </div>
    </div>
  );
}
