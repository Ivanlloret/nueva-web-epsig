"use client";

import { motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.94 },
  none: {},
};

export default function Reveal({
  children,
  className = "",
  style,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const offset = OFFSETS[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0, scale: offset.scale ?? 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      data-reveal=""
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
