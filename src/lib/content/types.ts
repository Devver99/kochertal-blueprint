/**
 * Datenmodell. Flach und mit ID-Referenzen aufgebaut, damit es sich
 * später 1:1 auf CMS-Collections (Sanity, Strapi, Payload …) abbilden lässt.
 */

export type TaxonomyTerm = {
  id: string;
  label: string;
};

export type Taxonomies = {
  industries: TaxonomyTerm[];
  districts: TaxonomyTerm[];
};

export type Address = {
  street: string;
  zip: string;
  city: string;
};

export type Member = {
  id: string;
  slug: string;
  name: string;
  owner?: string;
  /** Kurzer Satz für Karten und Listen. */
  tagline: string;
  description: string;
  /** Referenz auf Taxonomies.industries[].id */
  industry: string;
  /** Referenz auf Taxonomies.districts[].id */
  district: string;
  services: string[];
  address: Address;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  /** null → Platzhalter mit Initialen */
  logo: { src: string; alt: string } | null;
  /** Für die Hervorhebung auf der Startseite. */
  featured?: boolean;
  /** Fiktiver Demo-Eintrag. */
  isExample?: boolean;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** ISO 8601, lokale Zeit Europe/Berlin */
  start: string;
  end?: string;
  /** Termin steht noch nicht fest – `start` dient dann nur zur Sortierung. */
  dateTbd?: boolean;
  /** Anzeige, wenn `dateTbd` gesetzt ist, z. B. „Sommer 2027“. */
  dateLabel?: string;
  /** Ganztägig: keine Uhrzeit anzeigen. */
  allDay?: boolean;
  location: { name: string; address?: string };
  isExample?: boolean;
};

/** Mitglied mit aufgelösten Kategorien – so bekommen es die Komponenten. */
export type MemberView = Member & {
  industryLabel: string;
  districtLabel: string;
};

export type MemberFilters = {
  query?: string;
  industry?: string;
  district?: string;
};
