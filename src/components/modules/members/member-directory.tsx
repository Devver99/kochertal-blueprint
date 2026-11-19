import Link from "next/link";
import { filterMembers, getMembers } from "@/lib/content/members";
import { districtLabel, getDistricts, getIndustries, industryLabel } from "@/lib/content/taxonomies";
import type { MemberFilters, MemberView, TaxonomyTerm } from "@/lib/content/types";
import { MemberCard } from "./member-card";
import { MemberFilterForm, type FilterOption } from "./member-filter-form";

function withCounts(
  terms: TaxonomyTerm[],
  members: MemberView[],
  key: "industry" | "district",
): FilterOption[] {
  const counts = new Map<string, number>();
  for (const m of members) counts.set(m[key], (counts.get(m[key]) ?? 0) + 1);
  // Nur Kategorien anbieten, in denen es auch Betriebe gibt.
  return terms
    .map((t) => ({ ...t, count: counts.get(t.id) ?? 0 }))
    .filter((t) => t.count > 0);
}

function describeFilters(filters: MemberFilters) {
  const parts: string[] = [];
  if (filters.query) parts.push(`„${filters.query}“`);
  if (filters.industry) parts.push(industryLabel(filters.industry));
  if (filters.district) parts.push(districtLabel(filters.district));
  return parts.join(", ");
}

/** Verzeichnis mit Filterformular, Trefferzahl und Ergebnisliste. */
export async function MemberDirectory({
  filters,
  basePath = "/mitglieder",
}: {
  filters: MemberFilters;
  basePath?: string;
}) {
  const [all, results, industries, districts] = await Promise.all([
    getMembers(),
    filterMembers(filters),
    getIndustries(),
    getDistricts(),
  ]);

  const active = Boolean(filters.query || filters.industry || filters.district);
  const count = results.length;
  const countText =
    count === 1 ? "1 Betrieb" : `${count} Betriebe`;

  return (
    <div>
      <MemberFilterForm
        action={basePath}
        filters={filters}
        industries={withCounts(industries, all, "industry")}
        districts={withCounts(districts, all, "district")}
      />

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        {/* Wird nach jeder Filteränderung von Screenreadern vorgelesen. */}
        <p role="status" className="text-lg">
          <strong>{countText}</strong>
          {active ? <> gefunden für {describeFilters(filters)}</> : " im Verzeichnis"}
        </p>
        {active ? (
          <Link href={basePath} className="hidden font-bold text-kocher underline lg:inline">
            Alle Filter zurücksetzen
          </Link>
        ) : null}
      </div>

      {count > 0 ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((member) => (
            <li key={member.id}>
              <MemberCard member={member} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-sign border-2 border-dashed border-muted bg-white p-6 sm:p-8">
          <h2 className="text-xl">Kein passender Betrieb gefunden</h2>
          <p className="mt-2 max-w-[60ch]">
            Versuchen Sie einen allgemeineren Suchbegriff oder wählen Sie
            „Alle Branchen“ bzw. „Alle Ortsteile“.
          </p>
          <Link href={basePath} className="mt-4 inline-block font-bold text-kocher underline">
            Alle Betriebe anzeigen
          </Link>
        </div>
      )}
    </div>
  );
}
