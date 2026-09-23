"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { primaryNav } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span
            className="h-2.5 w-2.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
            aria-hidden
          />
          EPSIG
        </Link>

        <ul className="hidden items-center gap-0.5 text-sm lg:flex">
          {primaryNav.map((item) => (
            <li key={item.href} className="group relative">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-3.5 py-2 font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 font-medium transition-colors hover:bg-surface-alt hover:text-ink ${
                    item.highlight || isActive(item.href) ? "font-semibold text-primary" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )}

              {item.children && (
                <div
                  className={`invisible absolute left-0 top-full z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-surface p-2 opacity-0 shadow-[0_22px_40px_-20px_rgba(11,18,32,.25)] transition-all group-hover:visible group-hover:opacity-100 ${
                    item.children.length > 5 ? "grid w-[560px] grid-cols-2 gap-1" : "w-72"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3.5 py-2.5 hover:bg-surface-alt"
                    >
                      <span className="block text-sm font-semibold text-ink">{child.label}</span>
                      {child.description && (
                        <span className="block text-xs text-ink-soft">{child.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contacto"
            className="rounded-full border-[1.5px] border-line px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:border-ink"
          >
            Contacto
          </Link>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contacto#diagnostico"
              className="rounded-full bg-ink px-5.5 py-3 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(34,73,199,.6)] transition-colors hover:bg-primary"
            >
              Diagnóstico gratuito
            </Link>
          </motion.div>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="max-h-[calc(100vh-64px)] overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-1 text-[15px]">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 font-medium text-ink-soft"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-2.5 font-medium ${
                          item.highlight || isActive(item.href) ? "text-primary" : "text-ink-soft"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.children && (
                      <ul className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-2 py-2 text-sm text-ink-soft"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2.5">
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="rounded-full border-[1.5px] border-line px-5 py-2.5 text-center text-[13.5px] font-semibold"
                >
                  Contacto
                </Link>
                <Link
                  href="/contacto#diagnostico"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-ink px-5 py-3 text-center text-[13.5px] font-semibold text-white"
                >
                  Diagnóstico gratuito
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
