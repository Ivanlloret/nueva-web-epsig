import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de EPSIG Consultores SL.",
};

export default function AvisoLegalPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Aviso legal" />
      <section className="py-16 sm:py-20">
        <div className="prose-legal mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <p className="mb-4 rounded-brand border border-line bg-surface-alt p-4 text-sm text-ink">
            <strong>Pendiente de revisión legal:</strong> este texto es una plantilla de
            partida. Antes de publicarlo hay que completar los datos registrales (CIF,
            datos de inscripción en el Registro Mercantil) y que un asesor jurídico lo
            revise.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">1. Datos identificativos</h2>
          <p>
            En cumplimiento del deber de información recogido en el artículo 10 de la Ley
            34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del
            Comercio Electrónico, se informa que el titular de este sitio web es{" "}
            <strong>{site.legalName}</strong>, con CIF <em>[pendiente]</em> y domicilio en{" "}
            {site.offices[0].address}, {site.offices[0].locality}, inscrita en el Registro
            Mercantil <em>[pendiente]</em>. Correo de contacto: {site.email}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">2. Objeto</h2>
          <p>
            El presente sitio web tiene por objeto informar sobre los servicios de
            consultoría empresarial, transformación digital, implantación de Odoo ERP y
            protección de negocio que presta {site.legalName}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">3. Condiciones de uso</h2>
          <p>
            El acceso y uso de este sitio web atribuye la condición de usuario y acepta,
            desde dicho acceso, las condiciones de uso aquí reflejadas. Los contenidos se
            proporcionan a título informativo, sin que su uso genere ninguna relación
            comercial u obligación entre el usuario y {site.legalName}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web (textos, imágenes, marcas, logotipos) son
            titularidad de {site.legalName} o de terceros que han autorizado su uso, y
            están protegidos por la normativa de propiedad intelectual e industrial.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">5. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia derivada del acceso o uso de este sitio web, las partes se
            someten a los juzgados y tribunales que correspondan conforme a derecho.
          </p>
        </div>
      </section>
    </>
  );
}
