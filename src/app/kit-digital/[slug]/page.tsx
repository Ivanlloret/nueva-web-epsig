import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import { kitDigitalCategories } from "@/lib/site";

export function generateStaticParams() {
  return kitDigitalCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kit-digital/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.summary,
  };
}

export default async function KitDigitalCategoryPage({
  params,
}: PageProps<"/kit-digital/[slug]">) {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) notFound();

  return (
    <CatalogDetail
      eyebrow="Kit Digital"
      title={category.title}
      lead={category.summary}
      body={category.body}
      features={category.features}
      price={category.priceFrom}
      backHref="/kit-digital"
      backLabel="Ver todas las categorías de Kit Digital"
      ctaTitle="¿Quieres esta solución dentro de tu Kit Digital?"
      ctaBody="Comprobamos tu segmento y gestionamos toda la solicitud, de principio a fin."
      ctaLabel="Consultar mi Kit Digital"
    />
  );
}
