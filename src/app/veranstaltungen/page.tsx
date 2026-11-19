import type { Metadata } from "next";
import { EventList } from "@/components/sections/event-list";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { getEventSchedule } from "@/lib/content/events";

export const metadata: Metadata = {
  title: "Veranstaltungen",
  description:
    "Termine des Gewerbevereins Forchtenberg: Stammtische, Mitgliederversammlung und der Gewerbesommer.",
};

export default async function EventsPage() {
  const { upcoming, past } = await getEventSchedule();

  return (
    <>
      <PageHeader
        title="Veranstaltungen"
        lead="Stammtische, Versammlungen und der Gewerbesommer: Hier finden Sie alle Termine des Vereins. Gäste sind bei den meisten Treffen willkommen."
      />

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="upcoming-title">
          <h2 id="upcoming-title" className="text-2xl text-kocher sm:text-3xl">
            Kommende Termine
          </h2>
          <div className="mt-6">
            {upcoming.length > 0 ? (
              <EventList events={upcoming} />
            ) : (
              <p className="text-lg">
                Aktuell sind keine Termine geplant. Neue Termine erscheinen hier,
                sobald sie feststehen.
              </p>
            )}
          </div>
        </section>

        {past.length > 0 ? (
          <section aria-labelledby="past-title" className="mt-16">
            <h2 id="past-title" className="text-2xl text-muted">
              Vergangene Termine
            </h2>
            <div className="mt-6">
              <EventList events={past} muted />
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
