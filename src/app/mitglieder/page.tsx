import type { Metadata } from "next";
import { Suspense } from "react";
import { MemberDirectory } from "@/components/modules/members/member-directory";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { isDistrict, isIndustry } from "@/lib/content/taxonomies";
import type { MemberFilters } from "@/lib/content/types";

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

async function FilteredDirectory({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  return <MemberDirectory filters={filters} />;
}

export default function MembersPage({ searchParams }: PageProps<"/mitglieder">) {
  return (
    <>
      <PageHeader
        title="Mitglieder"
        lead="Handwerk, Handel und Dienstleistung aus Forchtenberg, Ernsbach, Sindringen und Wohlmuthausen. Suchen Sie nach Namen oder Leistung, oder filtern Sie nach Branche und Ortsteil."
      />
      <Container className="py-10 sm:py-14">
        {/*
          Die Filter hängen von der URL ab und werden pro Anfrage gerendert.
          Bis dahin zeigt das statische Grundgerüst das vollständige Verzeichnis.
        */}
        <Suspense fallback={<MemberDirectory filters={{}} />}>
          <FilteredDirectory searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
