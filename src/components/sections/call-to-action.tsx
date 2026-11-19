import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Auffälliges Band mit einer klaren Handlungsaufforderung. */
export function CallToAction({
  title,
  text,
  action,
}: {
  title: string;
  text?: ReactNode;
  action: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-raps">
      <Container className="flex flex-col gap-6 py-12 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-title" className="text-2xl text-ink sm:text-3xl">
            {title}
          </h2>
          {text ? <p className="mt-3 max-w-[55ch] text-lg">{text}</p> : null}
        </div>
        <ButtonLink
          href={action.href}
          variant="secondary"
          className="shrink-0 px-7 text-lg"
        >
          {action.label}
        </ButtonLink>
      </Container>
    </section>
  );
}
