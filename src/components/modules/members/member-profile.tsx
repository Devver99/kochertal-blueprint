import Link from "next/link";
import type { MemberView } from "@/lib/content/types";
import { displayUrl } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { MemberLogo } from "./member-logo";

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="font-bold text-muted">{label}</dt>
      <dd className="mt-0.5 break-words">{children}</dd>
    </div>
  );
}

/** Profilseite eines Mitgliedsbetriebs. */
export function MemberProfile({ member }: { member: MemberView }) {
  const { contact, address } = member;
  const services = member.services ?? [];
  const hasContact = Boolean(contact.phone || contact.email || contact.website);

  return (
    <article>
      <header className="border-b border-line bg-moos">
        <Container className="py-8 sm:py-12">
          <nav aria-label="Brotkrumen" className="mb-6">
            <ol className="flex flex-wrap gap-x-2 text-base text-muted">
              <li>
                <Link href="/" className="text-kocher underline">
                  Startseite
                </Link>
                <span aria-hidden="true" className="ml-2">/</span>
              </li>
              <li>
                <Link href="/mitglieder" className="text-kocher underline">
                  Mitglieder
                </Link>
                <span aria-hidden="true" className="ml-2">/</span>
              </li>
              <li aria-current="page">{member.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <MemberLogo member={member} size="lg" />
            <div className="min-w-0">
              <h1 className="text-3xl text-kocher sm:text-4xl">{member.name}</h1>
              <p className="mt-3 text-lg">
                <Link
                  href={`/mitglieder?branche=${member.industry}`}
                  className="font-bold text-ink underline decoration-raps decoration-[0.15em] hover:text-kocher"
                >
                  {member.industryLabel}
                </Link>
                <span className="text-muted"> in </span>
                <Link
                  href={`/mitglieder?ortsteil=${member.district}`}
                  className="font-bold text-ink underline decoration-raps decoration-[0.15em] hover:text-kocher"
                >
                  {member.districtLabel}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div className="space-y-10">
          {member.isExample ? (
            <p className="rounded-sign border-l-4 border-raps bg-white p-4">
              Dies ist ein frei erfundener Beispielbetrieb für die Demo-Website.
            </p>
          ) : null}

          {member.description ? (
            <section aria-labelledby="about-title">
              <h2 id="about-title" className="text-2xl text-kocher">
                Über den Betrieb
              </h2>
              <p className="mt-3 max-w-[65ch] text-lg">{member.description}</p>
              {member.owner ? (
                <p className="mt-3 text-muted">Inhaber: {member.owner}</p>
              ) : null}
            </section>
          ) : null}

          <section aria-labelledby="services-title">
            <h2 id="services-title" className="text-2xl text-kocher">
              Leistungen
            </h2>
            {services.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-sign border border-line bg-white px-4 py-3"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1 size-4 shrink-0 text-kocher"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-lg text-muted">
                Leistungen ergänzt der Betrieb in Kürze.
              </p>
            )}
          </section>
        </div>

        <aside aria-labelledby="contact-title" className="self-start rounded-sign border-2 border-kocher bg-white p-5 sm:p-6">
          <h2 id="contact-title" className="text-2xl text-kocher">
            Kontakt
          </h2>
          <dl className="mt-4">
            <ContactRow label="Adresse">
              <address className="not-italic">
                {address.street}
                <br />
                {address.zip} {address.city}
              </address>
            </ContactRow>
            {contact.phone ? (
              <ContactRow label="Telefon">
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="font-bold text-kocher underline">
                  {contact.phone}
                </a>
              </ContactRow>
            ) : null}
            {contact.email ? (
              <ContactRow label="E-Mail">
                <a href={`mailto:${contact.email}`} className="font-bold text-kocher underline">
                  {contact.email}
                </a>
              </ContactRow>
            ) : null}
            {contact.website ? (
              <ContactRow label="Website">
                <a href={contact.website} className="font-bold text-kocher underline">
                  {displayUrl(contact.website)}
                </a>
              </ContactRow>
            ) : null}
          </dl>
          {!hasContact ? (
            <p className="mt-4 border-t border-line pt-4 text-muted">
              Telefon, E-Mail und Website ergänzt der Betrieb in Kürze.
            </p>
          ) : null}
        </aside>
      </Container>
    </article>
  );
}
