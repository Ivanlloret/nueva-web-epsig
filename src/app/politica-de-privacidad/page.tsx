import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de EPSIG Consultores SL.",
};

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de privacidad" />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <p className="mb-4 rounded-brand border border-line bg-surface-alt p-4 text-sm text-ink">
            <strong>Pendiente de revisión legal:</strong> plantilla de partida — hay que
            confirmar con un asesor si se necesita Delegado de Protección de Datos y
            revisar cada finalidad de tratamiento antes de publicar.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">1. Responsable del tratamiento</h2>
          <p>
            {site.legalName}, con domicilio en {site.offices[0].address},{" "}
            {site.offices[0].locality}, es responsable del tratamiento de los datos
            personales que nos facilites a través de este sitio web. Puedes contactar con
            nosotros en {site.email}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">2. Finalidad del tratamiento</h2>
          <p>
            Tratamos los datos que nos facilitas a través del formulario de contacto
            (nombre, correo electrónico, teléfono, empresa y mensaje) exclusivamente para
            responder a tu solicitud de información o diagnóstico gratuito.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">3. Legitimación</h2>
          <p>
            La base legal para el tratamiento es el consentimiento que otorgas al enviar
            el formulario de contacto.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">4. Conservación de los datos</h2>
          <p>
            Los datos se conservarán durante el tiempo necesario para atender tu
            solicitud y, en su caso, durante el tiempo exigido por la normativa aplicable.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">5. Destinatarios</h2>
          <p>
            No se ceden datos a terceros salvo obligación legal. Los proveedores
            tecnológicos que dan soporte a este sitio web pueden acceder a los datos
            como encargados del tratamiento, conforme a la normativa vigente.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">6. Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
            limitación y portabilidad escribiendo a {site.email}, indicando el derecho
            que deseas ejercer y adjuntando copia de un documento que acredite tu
            identidad.
          </p>
        </div>
      </section>
    </>
  );
}
