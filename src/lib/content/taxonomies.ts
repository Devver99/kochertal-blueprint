import taxonomiesData from "@/data/taxonomies.json";
import type { Taxonomies, TaxonomyTerm } from "./types";

const taxonomies: Taxonomies = taxonomiesData;

const industryById = new Map(taxonomies.industries.map((t) => [t.id, t]));
const districtById = new Map(taxonomies.districts.map((t) => [t.id, t]));

export async function getIndustries(): Promise<TaxonomyTerm[]> {
  return taxonomies.industries;
}

export async function getDistricts(): Promise<TaxonomyTerm[]> {
  return taxonomies.districts;
}

export function industryLabel(id: string) {
  return industryById.get(id)?.label ?? id;
}

export function districtLabel(id: string) {
  return districtById.get(id)?.label ?? id;
}

export function isIndustry(id: string | undefined): id is string {
  return !!id && industryById.has(id);
}

export function isDistrict(id: string | undefined): id is string {
  return !!id && districtById.has(id);
}
