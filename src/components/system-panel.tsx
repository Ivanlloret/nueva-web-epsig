const nodes = [
  { key: "hub", label: "Núcleo ERP", code: "ODOO", color: "var(--color-primary)" },
  { key: "n2", label: "Leads", code: "CRM", color: "var(--color-secondary)" },
  { key: "n3", label: "Ventas", code: "€", color: "var(--color-accent-strong)" },
  { key: "n4", label: "Inventario", code: "Inv", color: "var(--color-chip-slate)" },
  { key: "n5", label: "Contabilidad", code: "Ct", color: "var(--color-chip-amber)" },
] as const;

export default function SystemPanel() {
  return (
    <div className="rounded-panel border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      <div className="mb-4.5 flex items-center justify-between">
        <span className="font-mono text-xs text-mist-soft">tu-empresa.odoo</span>
        <div className="flex gap-1.5">
          <i className="block h-2 w-2 rounded-full bg-white/20" />
          <i className="block h-2 w-2 rounded-full bg-white/20" />
          <i className="block h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="relative h-[270px]">
        <svg viewBox="0 0 320 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M160,58 L60,132" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path d="M160,58 L260,132" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path
            d="M60,132 L260,132"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            className="flow-line-live"
          />
          <path d="M60,132 L78,220" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path d="M260,132 L242,220" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
        </svg>

        <Node node={nodes[0]} className="left-1/2 top-0 -translate-x-1/2" big />
        <Node node={nodes[1]} className="left-[-8px] top-24" />
        <Node node={nodes[2]} className="right-[-8px] top-24" />
        <Node node={nodes[3]} className="bottom-0 left-[22px]" />
        <Node node={nodes[4]} className="bottom-0 right-[22px]" />
      </div>

      <div className="mt-4 flex justify-between font-mono text-[11.5px] text-mist-faint">
        <span>Estado: conectado</span>
        <span>5 módulos activos</span>
      </div>
    </div>
  );
}

function Node({
  node,
  className,
  big,
}: {
  node: (typeof nodes)[number];
  className: string;
  big?: boolean;
}) {
  return (
    <div className={`absolute w-[100px] text-center ${className}`}>
      <div
        className={`mx-auto mb-2 flex items-center justify-center rounded-xl font-mono font-medium text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,.6)] ${
          big ? "h-16 w-16 text-xs" : "h-[54px] w-[54px] text-[11px]"
        }`}
        style={{ background: node.color }}
      >
        {node.code}
      </div>
      <span className="text-[11px] font-medium text-mist-soft">{node.label}</span>
    </div>
  );
}
