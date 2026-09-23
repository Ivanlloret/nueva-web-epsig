import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Transformación Digital",
  description:
    "Automatización, IA y digitalización de procesos para pymes, financiable con Kit Digital y Kit Consulting.",
};

export default function TransformacionDigitalPage() {
  return (
    <ServiceDetail
      eyebrow="Transformación Digital"
      title="Automatización e IA aplicadas a tu día a día, no a la teoría"
      lead="Digitalizamos los procesos que realmente te quitan tiempo — y, cuando aplica, te ayudamos a financiarlo."
      code="TD"
      color="var(--color-secondary)"
      intro="Como Agente Digital Autorizado gestionamos proyectos de digitalización financiables con Kit Digital y Kit Consulting, desde la automatización de tareas repetitivas hasta la implantación de Odoo ERP como núcleo del negocio."
      features={[
        {
          title: "Automatización de procesos",
          body: "Eliminamos tareas manuales y repetitivas: facturación, comunicaciones, seguimiento de clientes.",
        },
        {
          title: "Inteligencia artificial aplicada",
          body: "Herramientas de IA integradas en procesos reales de la empresa, no experimentos aislados.",
        },
        {
          title: "Kit Digital y Kit Consulting",
          body: "Gestionamos la financiación pública de tu proyecto de digitalización como Agente Digital Autorizado.",
        },
        {
          title: "Odoo ERP",
          body: "El eje central de la transformación digital: un solo sistema para gestión, ventas e inventario.",
        },
      ]}
      ctaTitle="¿Quieres saber qué se puede digitalizar en tu empresa?"
      ctaBody="Revisamos tu situación actual y qué financiación pública puedes aprovechar."
      ctaLabel="Solicitar diagnóstico"
    />
  );
}
