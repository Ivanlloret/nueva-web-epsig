import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Protección del Negocio",
  description:
    "Ciberseguridad gestionada con ESET: auditoría, antivirus, backup, correo seguro y continuidad de negocio.",
};

export default function ProteccionDelNegocioPage() {
  return (
    <ServiceDetail
      eyebrow="Protección del Negocio"
      title="Ciberseguridad gestionada, sin que tengas que entender de informática"
      lead="Cuanto más digitalizas tu empresa, más importa protegerla. Lo hacemos con ESET, de forma gestionada."
      code="PN"
      color="var(--color-accent)"
      intro="Como partner de ESET auditamos, implantamos y mantenemos la seguridad de tu empresa: desde el antivirus hasta el plan de continuidad si algo falla. Tú te centras en tu negocio, nosotros en que siga funcionando."
      features={[
        {
          title: "Auditoría de seguridad",
          body: "Revisamos dónde está expuesta tu empresa antes de que sea un problema real.",
        },
        {
          title: "Antivirus y protección de endpoints",
          body: "Soluciones ESET gestionadas en todos los equipos de la empresa, con supervisión continua.",
        },
        {
          title: "Copias de seguridad (backup)",
          body: "Backup automatizado de la información crítica, con capacidad real de recuperación.",
        },
        {
          title: "Correo seguro y continuidad de negocio",
          body: "Protección del correo corporativo frente a phishing y un plan claro para seguir operando ante un incidente.",
        },
      ]}
      ctaTitle="¿Sabes qué pasaría si hoy fallara tu sistema?"
      ctaBody="Una auditoría gratuita para ver los puntos débiles de tu empresa."
      ctaLabel="Solicitar auditoría"
    />
  );
}
