"use client";

import Link from "next/link";
import { motion, useSpring } from "framer-motion";

const MotionLink = motion.create(Link);

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
  id?: string;
};

export default function TiltCard({ children, className = "", href, style, id }: TiltCardProps) {
  const rotateX = useSpring(0, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 22 });

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 7);
    rotateY.set((px - 0.5) * 7);
    event.currentTarget.style.setProperty("--spot-x", `${px * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${py * 100}%`);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const motionProps = {
    id,
    className: `card-spotlight ${className}`,
    style: { ...style, rotateX, rotateY, transformPerspective: 800 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { y: -6 },
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  };

  if (href) {
    return (
      <MotionLink href={href} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}
