"use client";

import { useId, useRef, useState } from "react";
import type { NavItem } from "@/config/site";
import { buttonClasses } from "@/components/ui/button";
import { NavLink } from "./nav-link";

/**
 * Menü für kleine Bildschirme. Beschriftet mit „Menü“ (nicht nur ein Icon),
 * schließt mit Escape und nach jedem Seitenwechsel.
 */
export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = () => setOpen(false);

  return (
    <div
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          close();
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-12 items-center gap-2 rounded-sign border-2 border-kocher px-4 font-bold text-kocher"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          aria-hidden="true"
          focusable="false"
        >
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}
        </svg>
        {open ? "Schließen" : "Menü"}
      </button>

      <nav
        id={panelId}
        aria-label="Hauptmenü"
        hidden={!open}
        className="absolute inset-x-0 top-full z-20 border-b-4 border-raps bg-white shadow-lg"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          <li>
            <NavLink
              item={{ label: "Startseite", href: "/" }}
              onNavigate={close}
              className="block border-b border-moos py-3.5 text-lg font-bold text-ink no-underline aria-[current=page]:text-kocher aria-[current=page]:underline"
            />
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                onNavigate={close}
                className="block border-b border-moos py-3.5 text-lg font-bold text-ink no-underline aria-[current=page]:text-kocher aria-[current=page]:underline"
              />
            </li>
          ))}
          <li className="pt-4 pb-2">
            <NavLink
              item={cta}
              onNavigate={close}
              className={buttonClasses("primary", "w-full")}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}
