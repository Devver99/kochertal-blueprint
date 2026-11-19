import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container size="prose" className="space-y-6 py-16">
      <h1 className="text-3xl text-kocher">Seite nicht gefunden</h1>
      <p className="text-lg">
        Unter dieser Adresse gibt es keine Seite. Vielleicht hat sich der Link
        geändert. Über die Startseite oder das Mitgliederverzeichnis finden Sie
        weiter.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Zur Startseite</ButtonLink>
        <ButtonLink href="/mitglieder" variant="outline">
          Zum Mitgliederverzeichnis
        </ButtonLink>
      </div>
    </Container>
  );
}
