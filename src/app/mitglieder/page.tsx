import type { Metadata } from "next";
import { MemberDirectory } from "@/components/modules/members/member-directory";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { isDistrict, isIndustry } from "@/lib/content/taxonomies";
import type { MemberFilters } from "@/lib/content/types";

/**
 * Blockierende Route: Die Seite wartet auf die Filter aus der URL und
 * liefert die fertige Trefferliste als HTML. Mit einem Suspense-Fallback
 * käme die gefilterte Liste nur per Inline-Skript nachgestreamt – ohne
 * JavaScript bliebe dann das ungefilterte Verzeichnis stehen.
 */
export const instant = false;

export const metadata: Metadata = {
  title: "Mitglieder",
  description:
    "Alle Mitgliedsbetriebe des Gewerbevereins Forchtenberg – nach Branche und Ortsteil filterbar.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Liest nur bekannte, gültige Werte aus der URL. */
function parseFilters(params: SearchParams): MemberFilters {
  const query = first(params.q)?.trim().slice(0, 80) || undefined;
  const industry = first(params.branche);
  const district = first(params.ortsteil);
  return {
    query,
    industry: isIndustry(industry) ? industry : undefined,
    district: isDistrict(district) ? district : undefined,
  };
}

export default async function MembersPage({ searchParams }: PageProps<"/mitglieder">) {
  const filters = parseFilters(await searchParams);
  return (
    <>
      <PageHeader
        title="Mitglieder"
        lead="Handwerk, Handel und Dienstleistung aus Forchtenberg, Ernsbach, Sindringen und Wohlmuthausen. Suchen Sie nach Namen oder Leistung, oder filtern Sie nach Branche und Ortsteil."
      />
      <Container className="py-10 sm:py-14">
        <MemberDirectory filters={filters} />
      </Container>
    </>
  );
}
