/**
 * Datums- und Textformatierung.
 *
 * Termine werden als lokale Ortszeit ohne Zeitzone gespeichert
 * („2027-01-21T19:00:00“). Damit ein Server in UTC nicht falsch umrechnet,
 * werden sie hier als UTC-Wanduhrzeit gelesen und auch in UTC formatiert.
 */

const LOCALE = "de-DE";

export function parseLocalDateTime(value: string): Date {
  const [date, time = "00:00"] = value.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm));
}

const dateLong = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const timeShort = new Intl.DateTimeFormat(LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

const dayNumber = new Intl.DateTimeFormat(LOCALE, { day: "numeric", timeZone: "UTC" });
const monthShort = new Intl.DateTimeFormat(LOCALE, { month: "short", timeZone: "UTC" });
const yearNumber = new Intl.DateTimeFormat(LOCALE, { year: "numeric", timeZone: "UTC" });

/** „Donnerstag, 21. Januar 2027“ */
export function formatDateLong(value: string) {
  return dateLong.format(parseLocalDateTime(value));
}

/** „19:00 Uhr“ bzw. „19:00 – 21:30 Uhr“ */
export function formatTimeRange(start: string, end?: string) {
  const from = timeShort.format(parseLocalDateTime(start));
  if (!end) return `${from} Uhr`;
  return `${from} – ${timeShort.format(parseLocalDateTime(end))} Uhr`;
}

/** Bausteine für ein Kalenderblatt: { day: "21", month: "Jan.", year: "2027" } */
export function dateParts(value: string) {
  const date = parseLocalDateTime(value);
  return {
    day: dayNumber.format(date).replace(".", ""),
    month: monthShort.format(date),
    year: yearNumber.format(date),
  };
}

/** Maschinenlesbarer Wert für <time dateTime>. */
export function toDateTimeAttr(value: string) {
  return value.length > 10 ? value.slice(0, 16) : value;
}

/** Initialen für Logo-Platzhalter, ohne Zusätze wie „(Beispiel)“. */
export function initials(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s&-]+/)
    .filter((word) => /^\p{Lu}/u.test(word));
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/** Website-URL ohne Protokoll für die Anzeige. */
export function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const UMLAUTS: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue" };

function stripAccents(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/**
 * Normalisiert Suchtext: klein, ß → ss, Umlaute → ae/oe/ue.
 * „Böttcher“ und „boettcher“ ergeben beide „boettcher“.
 */
export function normalizeSearch(text: string) {
  return stripAccents(
    text
      .toLocaleLowerCase(LOCALE)
      .replace(/ß/g, "ss")
      .replace(/[äöü]/g, (c) => UMLAUTS[c]),
  );
}

/**
 * Suchindex für einen Text: enthält beide Schreibweisen, damit auch
 * „bottcher“ (Umlaut ohne e getippt) noch trifft.
 */
export function searchIndexText(text: string) {
  const lower = text.toLocaleLowerCase(LOCALE).replace(/ß/g, "ss");
  return `${normalizeSearch(lower)} ${stripAccents(lower)}`;
}
