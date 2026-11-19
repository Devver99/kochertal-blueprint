import { siteConfig } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { SiteLogo } from "@/components/ui/site-logo";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  const { mainNav, cta } = siteConfig;
  return (
    <header className="relative border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <SiteLogo />

        <nav aria-label="Hauptmenü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  className="inline-flex min-h-12 items-center rounded-sign px-3 font-bold text-ink no-underline hover:text-kocher hover:underline aria-[current=page]:text-kocher aria-[current=page]:underline aria-[current=page]:decoration-raps aria-[current=page]:decoration-[0.18em]"
                />
              </li>
            ))}
            <li className="ml-3">
              <NavLink item={cta} className={buttonClasses("primary")} />
            </li>
          </ul>
        </nav>

        <MobileNav items={[...mainNav]} cta={cta} />
      </div>
    </header>
  );
}
