import type { Metadata } from "next";
import CatalogDetail from "@/components/catalog-detail";
import { asesoriaAreas } from "@/lib/site";

type AreaWithPage = Extract<(typeof asesoriaAreas)[number], { slug: string }>;
type AreaSlug = AreaWithPage["slug"];

function getArea(slug: AreaSlug) {
  return asesoriaAreas.find((area): area is AreaWithPage => "slug" in area && area.slug === slug)!;
}

export function asesoriaAreaMetadata(slug: AreaSlug): Metadata {
  const area = getArea(slug);
  return { title: area.pageTitle, description: area.description };
}

export default function AsesoriaArea({ slug }: { slug: AreaSlug }) {
  const area = getArea(slug);
  return (
    <CatalogDetail
      breadcrumbs={[
        { label: "Servicios", href: "/servicios" },
        { label: "Consultoría Empresarial", href: "/servicios/consultoria-empresarial" },
        { label: area.pageTitle, href: `/${area.slug}` },
      ]}
      eyebrow="Consultoría Empresarial"
      title={area.pageTitle}
      body={area.body}
      backHref="/servicios/consultoria-empresarial"
      backLabel="Ver toda la Consultoría Empresarial"
      ctaTitle="¿Hablamos de tu caso?"
      ctaBody="Una primera conversación gratuita para entender dónde estás y qué necesitas."
      ctaLabel="Solicitar diagnóstico"
    />
  );
}
