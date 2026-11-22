"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { MemberFilters, TaxonomyTerm } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { inputClasses, labelClasses, selectClasses } from "@/components/ui/form-styles";

export type FilterOption = TaxonomyTerm & { count: number };

type Values = { q: string; branche: string; ortsteil: string };

/** Wartezeit nach dem letzten Tastendruck, bevor die Suche läuft. */
const SEARCH_DELAY_MS = 300;

const toValues = (filters: MemberFilters): Values => ({
  q: filters.query ?? "",
  branche: filters.industry ?? "",
  ortsteil: filters.district ?? "",
});

/** Gleiche Normalisierung wie parseFilters() auf der Seite. */
const normalize = (values: Values): Values => ({
  ...values,
  q: values.q.trim().slice(0, 80),
});

const keyOf = (values: Values) => JSON.stringify(normalize(values));

function toHref(action: string, values: Values) {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(normalize(values))) {
    if (value) params.set(name, value);
  }
  const query = params.toString();
  return query ? `${action}?${query}` : action;
}

/**
 * Such- und Filterformular.
 *
 * Ohne JavaScript ein normales GET-Formular. Mit JavaScript aktualisiert
 * jede Änderung sofort die Liste: Die Filter werden per router.replace in
 * die URL geschrieben (teilbar, ohne neue Verlaufseinträge), die Seite
 * liest sie serverseitig aus `searchParams` und rendert die Treffer neu.
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
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [values, setValues] = useState(() => toValues(filters));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Zuletzt von hier angeforderter Filterstand.
  const urlKey = keyOf(toValues(filters));
  const [requestedKey, setRequestedKey] = useState(urlKey);
  const [syncedKey, setSyncedKey] = useState(urlKey);

  // Hat sich die URL von außen geändert (Zurücksetzen-Link, Zurück-Taste),
  // Felder angleichen. Eigene Navigationen überschreiben nie, was gerade
  // getippt wird.
  if (urlKey !== syncedKey) {
    setSyncedKey(urlKey);
    if (urlKey !== requestedKey) {
      setRequestedKey(urlKey);
      setValues(toValues(filters));
    }
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  function apply(next: Values) {
    clearTimeout(timer.current);
    const key = keyOf(next);
    if (key === requestedKey) return;
    setRequestedKey(key);
    startTransition(() => {
      router.replace(toHref(action, next), { scroll: false });
    });
  }

  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = { ...values, q: event.target.value };
    setValues(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => apply(next), SEARCH_DELAY_MS);
  }

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const name = event.target.name as "branche" | "ortsteil";
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    apply(next);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Enter im Suchfeld: sofort anwenden statt Seite neu zu laden.
    event.preventDefault();
    apply(values);
  }

  const active = Boolean(filters.query || filters.industry || filters.district);

  return (
    <form
      action={action}
      method="get"
      onSubmit={onSubmit}
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
          onChange={onSearchChange}
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
          onChange={onSelectChange}
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
          onChange={onSelectChange}
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
        {/* Ohne JavaScript nötig; mit JavaScript wirkt jede Änderung sofort. */}
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
    </form>
  );
}
