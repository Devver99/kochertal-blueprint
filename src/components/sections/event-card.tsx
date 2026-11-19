import type { Event } from "@/lib/content/types";
import { formatTimeRange } from "@/lib/format";
import { EventDate, EventDateText } from "@/components/ui/event-date";

/** Ein Termin mit Kalenderblatt, Datum, Uhrzeit, Ort und Kurzbeschreibung. */
export function EventCard({
  event,
  headingLevel = "h3",
  muted = false,
}: {
  event: Event;
  headingLevel?: "h2" | "h3";
  /** Für vergangene Termine. */
  muted?: boolean;
}) {
  const Heading = headingLevel;
  const showTime = !event.dateTbd && !event.allDay;

  return (
    <article
      id={event.slug}
      className={`flex flex-col gap-4 sm:flex-row sm:gap-7 ${muted ? "opacity-80" : ""}`}
    >
      <EventDate event={event} />
      <div className="min-w-0">
        <Heading className="text-xl text-ink sm:text-2xl">{event.title}</Heading>
        <dl className="mt-2 grid gap-x-3 gap-y-1 sm:grid-cols-[auto_1fr]">
          <dt className="font-bold text-muted">Wann</dt>
          <dd>
            <EventDateText event={event} />
            {showTime ? <>, {formatTimeRange(event.start, event.end)}</> : null}
          </dd>
          <dt className="font-bold text-muted">Wo</dt>
          <dd>
            {event.location.name}
            {event.location.address ? (
              <span className="text-muted">, {event.location.address}</span>
            ) : null}
          </dd>
        </dl>
        <p className="mt-3 max-w-[62ch]">{event.summary}</p>
      </div>
    </article>
  );
}
