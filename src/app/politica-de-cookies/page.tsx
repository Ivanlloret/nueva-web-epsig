import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de EPSIG Consultores SL.",
};

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de cookies" />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <h2 className="mb-3 text-xl text-ink">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu navegador al visitar
            un sitio web. Se usan para recordar información sobre tu visita.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">Cookies que utilizamos</h2>
          <p>
            Este sitio web utiliza únicamente las cookies técnicas estrictamente
            necesarias para su funcionamiento y seguridad. No utilizamos cookies de
            analítica, publicidad o redes sociales, por lo que no es necesario solicitar tu
            consentimiento.
          </p>
          <p className="mt-3">
            Nuestro proveedor de seguridad y distribución de contenidos, Cloudflare, puede
            instalar cookies técnicas (por ejemplo, <code>__cf_bm</code>) para proteger el
            sitio frente a bots y ataques. Estas cookies no se usan para identificarte ni
            para fines publicitarios.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">Cómo desactivar las cookies</h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo
            mediante la configuración de tu navegador.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">Más información</h2>
          <p>
            Si tienes dudas sobre esta política de cookies, puedes contactarnos en{" "}
            {site.email}.
          </p>
        </div>
      </section>
    </>
  );
}
