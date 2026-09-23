"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  allChoices,
  consentCategories,
  onOpenCookieSettings,
  saveConsent,
  useConsent,
  type ConsentChoices,
} from "@/lib/consent";

export default function CookieBanner() {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>(() => allChoices(false));
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      onOpenCookieSettings(() => {
        openerRef.current = document.activeElement as HTMLElement | null;
        setDraft(consent ? pickChoices(consent) : allChoices(false));
        setSettingsOpen(true);
      }),
    [consent],
  );

  // Al abrir la configuración, el foco pasa al panel para que teclado y lectores de pantalla lo encuentren.
  useEffect(() => {
    if (settingsOpen) titleRef.current?.focus();
  }, [settingsOpen]);

  // En servidor (undefined) no se pinta nada, para no provocar desajustes de hidratación.
  const visible = consent === null || settingsOpen;

  function closeSettings() {
    setSettingsOpen(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }

  function decide(choices: ConsentChoices) {
    saveConsent(choices);
    closeSettings();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          onKeyDown={(event) => {
            // Escape cierra la configuración si ya había una elección guardada.
            if (event.key === "Escape" && settingsOpen && consent) closeSettings();
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-panel border border-line bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(11,18,32,.35)] sm:p-6"
        >
          <h2
            id="cookie-banner-title"
            ref={titleRef}
            tabIndex={-1}
            className="mb-2 font-display text-base font-semibold text-ink outline-none"
          >
            {settingsOpen ? "Configurar cookies" : "Usamos cookies"}
          </h2>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            Utilizamos cookies técnicas necesarias para que la web funcione y, solo si lo
            aceptas, cookies opcionales para las finalidades que elijas. Puedes cambiar tu
            decisión en cualquier momento desde «Configurar cookies», en el pie de página. Más
            información en nuestra{" "}
            <Link href="/politica-de-cookies" className="font-medium text-primary hover:underline">
              política de cookies
            </Link>
            .
          </p>

          {settingsOpen && (
            <ul className="mt-4 flex max-h-[45vh] flex-col gap-2 overflow-y-auto">
              <CategoryRow
                title="Técnicas"
                body="Necesarias para el funcionamiento y la seguridad de la web. No se pueden desactivar."
                checked
                disabled
              />
              {consentCategories.map((category) => (
                <CategoryRow
                  key={category.id}
                  title={category.title}
                  body={category.body}
                  checked={draft[category.id]}
                  onChange={(checked) => setDraft((d) => ({ ...d, [category.id]: checked }))}
                />
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            {settingsOpen ? (
              <BannerButton onClick={() => decide(draft)}>Guardar selección</BannerButton>
            ) : (
              <BannerButton onClick={() => setSettingsOpen(true)}>Configurar</BannerButton>
            )}
            <BannerButton onClick={() => decide(allChoices(false))}>Rechazar todas</BannerButton>
            <BannerButton onClick={() => decide(allChoices(true))}>Aceptar todas</BannerButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function pickChoices(consent: ConsentChoices): ConsentChoices {
  return Object.fromEntries(consentCategories.map((c) => [c.id, consent[c.id]])) as ConsentChoices;
}

// Los tres botones tienen el mismo peso visual: la AEPD exige que rechazar sea tan fácil como aceptar.
function BannerButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary"
    >
      {children}
    </button>
  );
}

function CategoryRow({
  title,
  body,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <li>
      <label
        className={`flex items-start justify-between gap-4 rounded-brand border border-line bg-surface-alt p-3.5 ${
          disabled ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <span>
          <span className="block text-sm font-semibold text-ink">{title}</span>
          <span className="block text-[12.5px] leading-snug text-ink-soft">{body}</span>
        </span>
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="relative mt-0.5 h-6 w-10 shrink-0 rounded-full bg-chip-muted transition-colors peer-checked:bg-accent-strong peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-primary after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4"
        />
      </label>
    </li>
  );
}
