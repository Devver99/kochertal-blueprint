import type { Event } from "@/lib/content/types";
import { EventCard } from "./event-card";

/** Terminliste mit Trennlinien. */
export function EventList({
  events,
  muted = false,
  headingLevel = "h3",
}: {
  events: Event[];
  muted?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {events.map((event) => (
        <li key={event.id} className="py-8">
          <EventCard event={event} muted={muted} headingLevel={headingLevel} />
        </li>
      ))}
    </ol>
  );
}
