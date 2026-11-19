"use client";

import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import type { MemberFilters, TaxonomyTerm } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { inputClasses, labelClasses, selectClasses } from "@/components/ui/form-styles";

export type FilterOption = TaxonomyTerm & { count: number };

type Values = { q: string; branche: string; ortsteil: string };

const toValues = (filters: MemberFilters): Values => ({
  q: filters.query ?? "",
  branche: filters.industry ?? "",
  ortsteil: filters.district ?? "",
});

/**
 * Such- und Filterformular. Ein normales GET-Formular – die Filter stehen
 * in der URL und lassen sich teilen. Mit JavaScript navigiert next/form
 * ohne Neuladen; der Fokus bleibt dabei erhalten.
 */
export function MemberFilterForm({
  action,
  filters,
  industries,
  districts,
}: {
  action: string;
  filters: MemberFilters;
  industries: FilterOption[];
  districts: FilterOption[];
}) {
  const [values, setValues] = useState(() => toValues(filters));

  // Ändert sich die URL (z. B. über „Filter zurücksetzen“), Felder angleichen.
  const urlKey = JSON.stringify(toValues(filters));
  const [syncedKey, setSyncedKey] = useState(urlKey);
  if (urlKey !== syncedKey) {
    setSyncedKey(urlKey);
    setValues(toValues(filters));
  }

  const set = (name: keyof Values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setValues((prev) => ({ ...prev, [name]: event.target.value }));

  const active = Boolean(filters.query || filters.industry || filters.district);

  return (
    <Form
      action={action}
      role="search"
      aria-label="Mitglieder suchen und filtern"
      className="grid gap-4 rounded-sign border-2 border-line bg-white p-5 sm:p-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end"
    >
      <div className="md:col-span-2 lg:col-span-1">
        <label htmlFor="filter-q" className={labelClasses}>
          Name oder Leistung
        </label>
        <input
          id="filter-q"
          name="q"
          type="search"
          value={values.q}
          onChange={set("q")}
          autoComplete="off"
          placeholder="z. B. Friseur, Heizung, Wein"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="filter-branche" className={labelClasses}>
          Branche
        </label>
        <select
          id="filter-branche"
          name="branche"
          value={values.branche}
          onChange={set("branche")}
          className={selectClasses}
        >
          <option value="">Alle Branchen</option>
          {industries.map((term) => (
            <option key={term.id} value={term.id}>
              {term.label} ({term.count})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-ortsteil" className={labelClasses}>
          Ortsteil
        </label>
        <select
          id="filter-ortsteil"
          name="ortsteil"
          value={values.ortsteil}
          onChange={set("ortsteil")}
          className={selectClasses}
        >
          <option value="">Alle Ortsteile</option>
          {districts.map((term) => (
            <option key={term.id} value={term.id}>
              {term.label} ({term.count})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-2 lg:col-span-1">
        <Button type="submit" variant="secondary" className="w-full sm:w-auto">
          Betriebe anzeigen
        </Button>
        {active ? (
          <Link
            href={action}
            className="inline-flex min-h-12 items-center font-bold text-kocher underline lg:hidden"
          >
            Filter zurücksetzen
          </Link>
        ) : null}
      </div>
    </Form>
  );
}
