/**
 * Zugriff auf Termine. Wie bei den Mitgliedern gilt: Für ein CMS wird
 * nur diese Datei ausgetauscht.
 */
import { cacheLife } from "next/cache";
import eventsData from "@/data/events.json";
import { parseLocalDateTime } from "@/lib/format";
import type { Event } from "./types";

const events: Event[] = eventsData;

const byStart = (a: Event, b: Event) =>
  parseLocalDateTime(a.start).getTime() - parseLocalDateTime(b.start).getTime();

/** Ein Termin gilt bis zu seinem Ende (oder Tagesende) als bevorstehend. */
function endOf(event: Event) {
  const end = parseLocalDateTime(event.end ?? event.start);
  if (!event.end) end.setUTCHours(23, 59);
  return end.getTime();
}

/** Aktuelle Wanduhrzeit in Deutschland, als UTC-Wert wie in parseLocalDateTime. */
function nowInBerlin() {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
  return parseLocalDateTime(parts.replace(" ", "T")).getTime();
}

/**
 * Teilt Termine in bevorstehende und vergangene.
 * Die aktuelle Zeit wird gecacht (stündlich erneuert), damit die Seiten
 * statisch vorgerendert werden können.
 */
export async function getEventSchedule(): Promise<{
  upcoming: Event[];
  past: Event[];
}> {
  "use cache";
  cacheLife("hours");

  const now = nowInBerlin();
  const upcoming = events.filter((e) => endOf(e) >= now).toSorted(byStart);
  const past = events
    .filter((e) => endOf(e) < now)
    .toSorted((a, b) => byStart(b, a));
  return { upcoming, past };
}

export async function getNextEvent(): Promise<Event | null> {
  const { upcoming } = await getEventSchedule();
  return upcoming[0] ?? null;
}
