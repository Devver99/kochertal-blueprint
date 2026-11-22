/**
 * Zentrale Kundenkonfiguration.
 *
 * Für ein neues Kundenprojekt werden hier Name, Navigation und Kontakt
 * angepasst. Farben und Schriften liegen in `src/app/globals.css` (@theme)
 * bzw. `src/app/fonts.ts`.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Gewerbeverein Forchtenberg",
  shortName: "Gewerbeverein",
  claim: "Handwerk, Handel und Dienstleistung im Kochertal",
  description:
    "Der Gewerbeverein Forchtenberg vereint über 100 Betriebe aus Forchtenberg, Ernsbach, Sindringen und Wohlmuthausen.",
  locale: "de-DE",
  timeZone: "Europe/Berlin",
  /** Wird für absolute URLs (Metadata, Sitemap) verwendet. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Suchmaschinen aussperren (Meta-Tag `robots` und Header `X-Robots-Tag`
   * auf allen Seiten). Bleibt an, solange die Seite eine Demo oder
   * Vorschau ist – erst für den echten Livegang auf `false` setzen.
   */
  noindex: true,
  /** Hinweis im Footer, solange die Seite eine Demo mit fiktiven Inhalten ist. */
  demoNotice:
    "Demo-Website. Mit „(Beispiel)“ markierte Betriebe und Termine sind frei erfunden.",

  contact: {
    // Platzhalter – echte Vereinsdaten folgen.
    organisation: "Gewerbeverein Forchtenberg e. V.",
    street: "Anschrift folgt",
    zip: "74670",
    city: "Forchtenberg",
    email: "kontakt@gewerbeverein.example",
  },

  mainNav: [
    { label: "Mitglieder", href: "/mitglieder" },
    { label: "Veranstaltungen", href: "/veranstaltungen" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
  ] satisfies NavItem[],

  cta: { label: "Mitglied werden", href: "/mitglied-werden" } satisfies NavItem,

  legalNav: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;
