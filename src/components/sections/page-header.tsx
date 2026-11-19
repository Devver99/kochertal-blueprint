import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

/** Kopfbereich für Unterseiten: Titel, optionaler Einleitungstext und Zusatzinhalt. */
export function PageHeader({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-moos">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl text-kocher sm:text-4xl">{title}</h1>
        {lead ? (
          <p className="mt-4 max-w-[60ch] text-lg text-ink">{lead}</p>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
