import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export type FeatureItem = {
  title: string;
  text: ReactNode;
};

/** Überschrift mit Einleitung links, Liste von Punkten rechts. */
export function Features({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: ReactNode;
  items: FeatureItem[];
}) {
  return (
    <section aria-labelledby="features-title" className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 id="features-title" className="text-2xl text-kocher sm:text-3xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 max-w-[45ch] text-lg">{intro}</p> : null}
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => (
            <li key={item.title} className="border-l-4 border-raps pl-5">
              <h3 className="text-xl text-ink">{item.title}</h3>
              <p className="mt-2 max-w-[60ch] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
