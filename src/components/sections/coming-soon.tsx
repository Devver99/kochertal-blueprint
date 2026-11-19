import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "./page-header";

/** Platzhalter für Seiten, deren Inhalt noch erstellt wird. */
export function ComingSoon({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} />
      <Container size="prose" className="space-y-6 py-12">
        <p className="text-lg">
          Diese Seite wird gerade erstellt und ist bald verfügbar.
        </p>
        {children}
        <ButtonLink href="/" variant="outline">
          Zur Startseite
        </ButtonLink>
      </Container>
    </>
  );
}
