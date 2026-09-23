import Image from "next/image";
import Link from "next/link";
import CookieSettingsButton from "@/components/cookie-settings-button";
import logoWhite from "@/assets/logo-epsig-white.png";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark-2 py-16 text-mist-soft">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-11 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${site.name} — Inicio`}>
              <Image src={logoWhite} alt={site.name} className="h-11 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-faint">
              {site.footerTagline}
            </p>
            <ul className="mt-5 flex gap-4 text-sm">
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Encuéntranos</FooterHeading>
            <ul className="flex flex-col gap-4 text-sm leading-relaxed">
              {site.offices.map((office) => (
                <li key={office.name}>
                  <span className="block text-mist">{office.address}</span>
                  <span className="block text-mist-faint">{office.locality}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Contacto</FooterHeading>
            <ul className="flex flex-col gap-2 text-sm">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:+34${phone.replace(/\s/g, "")}`} className="text-mist transition-colors hover:text-white">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="text-mist transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
            <FooterHeading className="mt-6">Horario</FooterHeading>
            <p className="text-sm text-mist">{site.hours}</p>
          </div>

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
            <CookieSettingsButton className="hover:text-white" />
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
      <FooterHeading>{title}</FooterHeading>
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

function FooterHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h5 className={`mb-4 text-xs font-semibold uppercase tracking-widest text-mist-faint ${className}`}>
      {children}
    </h5>
  );
}
