import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

/**
 * Migas de pan visibles + datos estructurados BreadcrumbList para Google.
 * El último elemento es la página actual (no se enlaza).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Inicio", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${site.url}${crumb.href === "/" ? "/" : `${crumb.href}/`}`,
    })),
  };

  return (
    <nav aria-label="Migas de pan" className="mb-5">
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12.5px] text-mist-soft">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-mist">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                  <span aria-hidden className="text-mist-faint">
                    ›
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </nav>
  );
}
