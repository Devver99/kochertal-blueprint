import Link from "next/link";
import { CallToAction } from "@/components/sections/call-to-action";
import { EventTeaser } from "@/components/sections/event-teaser";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { MemberCard } from "@/components/modules/members/member-card";
import { MemberQuickSearch } from "@/components/modules/members/member-quick-search";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getHighlightedEvents } from "@/lib/content/events";
import { getFeaturedMembers } from "@/lib/content/members";

export default async function HomePage() {
  const [{ highlight, more }, featured] = await Promise.all([
    getHighlightedEvents(),
    getFeaturedMembers(3),
  ]);

  return (
    <>
      <Hero
        title="Hier arbeitet Forchtenberg."
        lead="Über 100 Betriebe aus Forchtenberg, Ernsbach, Sindringen und Wohlmuthausen sind im Gewerbeverein zusammengeschlossen. Finden Sie Handwerk, Handel und Dienstleistung direkt vor Ort."
      >
        <MemberQuickSearch />
        <p className="mt-6 text-hell">
          Sie haben selbst einen Betrieb?{" "}
          <Link
            href={siteConfig.cta.href}
            className="font-bold text-white underline hover:text-raps"
          >
            So werden Sie Mitglied
          </Link>
        </p>
      </Hero>

      <EventTeaser highlight={highlight} more={more.slice(0, 2)} />

      <Features
        title="Was der Verein für seine Mitglieder tut"
        intro="Der Gewerbeverein ist der Zusammenschluss der Selbstständigen in Forchtenberg und seinen Ortsteilen – vom Ein-Personen-Betrieb bis zum Handwerksunternehmen."
        items={[
          {
            title: "Kontakte vor Ort",
            text: "Bei Stammtischen und Treffen lernen sich Betriebe aus allen Ortsteilen kennen. Aufträge bleiben in der Region, Fragen werden auf kurzem Weg geklärt.",
          },
          {
            title: "Gemeinsam sichtbar",
            text: "Im Mitgliederverzeichnis und beim Gewerbesommer zeigt sich, wie vielfältig das Gewerbe in Forchtenberg ist.",
          },
          {
            title: "Eine Stimme für das örtliche Gewerbe",
            text: "Der Verein vertritt die Anliegen seiner Mitglieder gegenüber Stadt und Region.",
          },
        ]}
      />

      <section aria-labelledby="highlights-title" className="border-t border-line bg-moos py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="highlights-title" className="text-2xl text-kocher sm:text-3xl">
              Betriebe aus dem Verein
            </h2>
            <Link href="/mitglieder" className="font-bold text-kocher underline">
              Alle Mitglieder ansehen
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((member) => (
              <li key={member.id}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CallToAction
        title="Ihr Betrieb gehört dazu?"
        text="Als Mitglied erscheint Ihr Betrieb im Verzeichnis, Sie sind zu allen Treffen eingeladen und gestalten den Gewerbesommer mit."
        action={siteConfig.cta}
      />
    </>
  );
}
