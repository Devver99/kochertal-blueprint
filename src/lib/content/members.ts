/**
 * Zugriff auf Mitgliederdaten. Seiten und Komponenten importieren nur
 * diese Funktionen, nie die JSON-Datei direkt. Für ein CMS wird nur
 * diese Datei ausgetauscht – die Signaturen sind bereits async.
 */
import membersData from "@/data/members.json";
import { normalizeSearch, searchIndexText } from "@/lib/format";
import { districtLabel, industryLabel } from "./taxonomies";
import type { Member, MemberFilters, MemberView } from "./types";

const members: Member[] = membersData;

const collator = new Intl.Collator("de-DE");

function toView(member: Member): MemberView {
  return {
    ...member,
    industryLabel: industryLabel(member.industry),
    districtLabel: districtLabel(member.district),
  };
}

/**
 * Alle Mitglieder alphabetisch. Echte Betriebe stehen vor den
 * fiktiven Beispielen.
 */
const allMembers: MemberView[] = members
  .map(toView)
  .toSorted(
    (a, b) =>
      Number(!!a.isExample) - Number(!!b.isExample) ||
      collator.compare(a.name, b.name),
  );

const searchIndex = new Map(
  allMembers.map((m) => [
    m.id,
    searchIndexText(
      [m.name, m.owner, m.tagline, m.industryLabel, m.districtLabel, ...m.services]
        .filter(Boolean)
        .join(" "),
    ),
  ]),
);

export async function getMembers(): Promise<MemberView[]> {
  return allMembers;
}

export async function getMemberBySlug(slug: string): Promise<MemberView | null> {
  return allMembers.find((m) => m.slug === slug) ?? null;
}

export async function getFeaturedMembers(limit = 3): Promise<MemberView[]> {
  return allMembers.filter((m) => m.featured).slice(0, limit);
}

export async function getMemberCount(): Promise<number> {
  return allMembers.length;
}

export async function filterMembers(filters: MemberFilters): Promise<MemberView[]> {
  const terms = filters.query
    ? normalizeSearch(filters.query).split(/\s+/).filter(Boolean)
    : [];

  return allMembers.filter((m) => {
    if (filters.industry && m.industry !== filters.industry) return false;
    if (filters.district && m.district !== filters.district) return false;
    if (terms.length === 0) return true;
    const haystack = searchIndex.get(m.id) ?? "";
    return terms.every((term) => haystack.includes(term));
  });
}
