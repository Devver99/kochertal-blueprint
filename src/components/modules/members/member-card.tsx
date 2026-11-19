import Link from "next/link";
import type { MemberView } from "@/lib/content/types";
import { MemberLogo } from "./member-logo";

/**
 * Karte im Verzeichnis. Die ganze Fläche ist klickbar, es gibt aber nur
 * einen Link (am Namen) – so bleibt die Tastaturbedienung übersichtlich.
 */
export function MemberCard({
  member,
  headingLevel = "h3",
}: {
  member: MemberView;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full gap-4 rounded-sign border-2 border-line bg-white p-5 transition-colors focus-within:border-kocher hover:border-kocher">
      <MemberLogo member={member} />
      <div className="min-w-0">
        <Heading className="text-lg leading-snug">
          <Link
            href={`/mitglieder/${member.slug}`}
            className="text-kocher no-underline group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:underline"
          >
            {member.name}
          </Link>
        </Heading>
        <p className="mt-1 font-bold text-ink">{member.industryLabel}</p>
        <p className="text-muted">{member.tagline}</p>
        <p className="mt-2 text-muted">
          {member.address.street}, {member.districtLabel}
        </p>
      </div>
    </article>
  );
}
