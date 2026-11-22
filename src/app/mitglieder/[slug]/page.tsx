import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberCard } from "@/components/modules/members/member-card";
import { MemberProfile } from "@/components/modules/members/member-profile";
import { Container } from "@/components/ui/container";
import { getMemberBySlug, getMembers } from "@/lib/content/members";

/** Alle Profile werden beim Build vorgerendert. */
export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/mitglieder/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: `${member.tagline ? `${member.tagline} – ` : ""}${member.industryLabel} in ${member.districtLabel}. Mitglied im Gewerbeverein Forchtenberg.`,
  };
}

export default async function MemberPage({
  params,
}: PageProps<"/mitglieder/[slug]">) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const related = (await getMembers())
    .filter((m) => m.industry === member.industry && m.id !== member.id)
    .slice(0, 3);

  return (
    <>
      <MemberProfile member={member} />

      <section
        aria-labelledby="related-title"
        className={`border-t border-line bg-moos ${related.length > 0 ? "py-12 sm:py-16" : "py-4"}`}
      >
        <Container>
          {related.length > 0 ? (
            <>
              <h2 id="related-title" className="text-2xl text-kocher">
                Weitere Betriebe: {member.industryLabel}
              </h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((m) => (
                  <li key={m.id}>
                    <MemberCard member={m} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h2 id="related-title" className="sr-only">
              Weitere Betriebe
            </h2>
          )}
          <Link
            href="/mitglieder"
            className="mt-8 inline-block text-lg font-bold text-kocher underline"
          >
            Zurück zum Mitgliederverzeichnis
          </Link>
        </Container>
      </section>
    </>
  );
}
