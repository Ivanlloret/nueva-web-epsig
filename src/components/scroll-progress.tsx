// Barra de progreso de lectura con CSS (animation-timeline: scroll()), sin JavaScript.
// En navegadores sin soporte simplemente no se muestra.
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden />;
}
