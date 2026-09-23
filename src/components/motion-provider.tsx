"use client";

import { MotionConfig } from "framer-motion";

// Las animaciones de framer-motion se desactivan si el usuario pide reducir el movimiento.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
