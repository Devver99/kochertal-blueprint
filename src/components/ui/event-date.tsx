import type { Event } from "@/lib/content/types";
import { dateParts, formatDateLong, toDateTimeAttr } from "@/lib/format";

/** Kalenderblatt mit Tag und Monat – oder Jahr, wenn der Termin noch offen ist. */
export function EventDate({ event }: { event: Event }) {
  const { day, month, year } = dateParts(event.start);
  const tbd = event.dateTbd;

  return (
    <div
      className="flex w-20 shrink-0 flex-col self-start overflow-hidden rounded-sign border-2 border-kocher bg-white text-center sm:w-24"
      aria-hidden="true"
    >
      <span className="bg-kocher py-1 text-base font-bold text-white">
        {tbd ? "Termin" : month}
      </span>
      <span className="py-2 font-display text-2xl font-bold text-kocher sm:text-3xl">
        {tbd ? year : day}
      </span>
    </div>
  );
}

/** Datum als lesbarer Text inkl. maschinenlesbarem <time>. */
export function EventDateText({ event }: { event: Event }) {
  if (event.dateTbd) {
    return (
      <span>
        {event.dateLabel ?? "Termin folgt"} – genauer Termin folgt
      </span>
    );
  }
  return (
    <time dateTime={toDateTimeAttr(event.start)}>
      {formatDateLong(event.start)}
    </time>
  );
}
