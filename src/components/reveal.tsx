type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

/**
 * Aparición al hacer scroll, solo con CSS (scroll-driven animations): sin JavaScript
 * y sin retrasar la carga. En navegadores sin soporte el contenido se ve directamente.
 * `delay` y `duration` se mantienen por compatibilidad, pero la animación depende del scroll.
 */
export default function Reveal({
  children,
  className = "",
  style,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  return (
    <div className={`reveal ${className}`} data-dir={direction} style={style}>
      {children}
    </div>
  );
}
