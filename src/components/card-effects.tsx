"use client";

import { useEffect } from "react";

/**
 * Un único listener para todas las tarjetas `.card-spotlight`: calcula la posición
 * del ratón y la pasa a CSS (foco de luz e inclinación). Solo en dispositivos con
 * ratón y si el usuario no ha pedido reducir el movimiento.
 */
export default function CardEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    let current: HTMLElement | null = null;
    let frame = 0;

    function reset(card: HTMLElement) {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    }

    function onMove(event: PointerEvent) {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".card-spotlight") ?? null;
      if (current && current !== card) reset(current);
      current = card;
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--spot-x", `${px * 100}%`);
        card.style.setProperty("--spot-y", `${py * 100}%`);
        if (!reduced.matches) {
          card.style.setProperty("--rx", `${((0.5 - py) * 7).toFixed(2)}deg`);
          card.style.setProperty("--ry", `${((px - 0.5) * 7).toFixed(2)}deg`);
        }
      });
    }

    function onLeave() {
      if (current) reset(current);
      current = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
