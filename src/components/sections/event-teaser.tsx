import Link from "next/link";
import type { Event } from "@/lib/content/types";
import { Container } from "@/components/ui/container";
import { EventDateText } from "@/components/ui/event-date";
import { EventCard } from "./event-card";

/** Nächster Termin groß, danach die folgenden Termine kompakt. */
export function EventTeaser({
  title = "Nächste Veranstaltung",
  next,
  more = [],
  allHref = "/veranstaltungen",
}: {
  title?: string;
  next: Event | null;
  more?: Event[];
  allHref?: string;
}) {
  return (
    <section aria-labelledby="event-teaser-title" className="bg-white py-16 sm:py-20">
      <Container>
        <h2 id="event-teaser-title" className="text-2xl text-kocher sm:text-3xl">
          {title}
        </h2>

        {next ? (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div className="rounded-sign border-2 border-kocher p-5 sm:p-8">
              <EventCard event={next} />
            </div>
            {more.length > 0 ? (
              <div>
                <h3 className="text-lg text-ink">Danach</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {more.map((event) => (
                    <li key={event.id} className="py-4">
                      <Link
                        href={`${allHref}#${event.slug}`}
                        className="font-bold text-kocher underline hover:decoration-raps hover:decoration-[0.18em]"
                      >
                        {event.title}
                      </Link>
                      <p className="text-muted">
                        <EventDateText event={event} />
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href={allHref}
                  className="mt-5 inline-block font-bold text-kocher underline"
                >
                  Alle Veranstaltungen ansehen
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-6 text-lg">
            Aktuell sind keine Termine geplant.{" "}
            <Link href={allHref} className="font-bold text-kocher underline">
              Zum Veranstaltungskalender
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}
