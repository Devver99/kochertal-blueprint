import Link from "next/link";
import { siteConfig } from "@/config/site";
import { RiverLine } from "@/components/ui/river-line";
import { SiteLogo } from "@/components/ui/site-logo";

const linkClass =
  "inline-block py-1.5 text-white underline decoration-hell/60 hover:text-raps hover:decoration-raps";

export function SiteFooter() {
  const { contact, mainNav, legalNav, cta } = siteConfig;
  return (
    <footer className="on-dark mt-auto bg-deep text-hell">
      <RiverLine className="h-10 w-full text-raps" strokeWidth={4} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <SiteLogo tone="light" />
          <address className="not-italic">
            {contact.organisation}
            <br />
            {contact.street}
            <br />
            {contact.zip} {contact.city}
            <br />
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
          </address>
        </div>

        <nav aria-label="Seiten">
          <h2 className="mb-2 font-display text-lg text-white">Seiten</h2>
          <ul>
            {[...mainNav, cta].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rechtliches">
          <h2 className="mb-2 font-display text-lg text-white">Rechtliches</h2>
          <ul>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-kocher">
        <p className="mx-auto max-w-6xl px-4 py-5 text-base sm:px-6">
          {siteConfig.demoNotice}
        </p>
      </div>
    </footer>
  );
}
