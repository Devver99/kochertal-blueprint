import type { ReactNode } from "react";
import { RiverLine } from "@/components/ui/river-line";

/**
 * Großer Einstieg auf dunklem Grund. Unten läuft die Kocher-Linie
 * als markantes Gestaltungselement durch.
 */
export function Hero({
  title,
  lead,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  /** Aktionen, z. B. ein Suchformular oder Buttons. */
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-28 sm:px-6 sm:pt-20 sm:pb-36">
        <h1 className="max-w-[16ch] text-[2.5rem] leading-[1.05] sm:text-[4rem] lg:text-[4.75rem]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-[52ch] text-lg text-hell sm:text-xl sm:leading-normal">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
      <RiverLine
        className="absolute inset-x-0 bottom-4 h-20 w-full text-raps sm:h-28"
        strokeWidth={7}
      />
    </section>
  );
}
