"use client";

import Script from "next/script";
import ConsentGate from "@/components/consent-gate";

// Solo se acepta un ID de medición válido (G-XXXXXXX), ya que se inserta en un script.
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const gaId = rawGaId && /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : undefined;

// Google Analytics 4. Solo se carga con el ID configurado y tras aceptar las cookies analíticas.
export default function GoogleAnalytics() {
  if (!gaId) return null;
  return (
    <ConsentGate category="analytics">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </ConsentGate>
  );
}
