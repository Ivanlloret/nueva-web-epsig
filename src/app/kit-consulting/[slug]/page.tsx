import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import { kitConsultingServices } from "@/lib/site";

export function generateStaticParams() {
  return kitConsultingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kit-consulting/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function KitConsultingServicePage({
  params,
}: PageProps<"/kit-consulting/[slug]">) {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <CatalogDetail
      eyebrow="Kit Consulting"
      title={service.title}
      lead={service.summary}
      body={service.body}
      backHref="/kit-consulting"
      backLabel="Ver todos los bonos de Kit Consulting"
      ctaTitle="¿Quieres usar tu bono en este servicio?"
      ctaBody="Comprobamos tu elegibilidad y gestionamos toda la solicitud del bono."
      ctaLabel="Consultar mi bono"
    />
  );
}
