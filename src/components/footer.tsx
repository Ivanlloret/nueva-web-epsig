import Link from "next/link";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark-2 py-16 text-mist-soft">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-11 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
              EPSIG
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-faint">
              {site.description}
            </p>
          </div>

          <FooterCol title="Servicios" items={footerNav.servicios} />
          <FooterCol title="Financiación" items={footerNav.financiacion} />
          <FooterCol title="Empresa" items={footerNav.empresa} />
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist-faint md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.legalName}
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/aviso-legal" className="hover:text-white">
              Aviso legal
            </Link>
            <Link href="/politica-de-cookies" className="hover:text-white">
              Política de cookies
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-white">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h5 className="mb-4 text-xs font-semibold uppercase tracking-widest text-mist-faint">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5 text-sm">
        {items.map((item) =>
          item.href.startsWith("http") ? (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className="text-mist transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
