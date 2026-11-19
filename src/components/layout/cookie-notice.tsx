"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

/**
 * Schlichter Hinweis: Die Seite setzt keine Tracking-Cookies, daher ist
 * keine Einwilligung nötig – nur eine Information. Sobald Dienste mit
 * Einwilligungspflicht dazukommen (z. B. Karten, Statistik), muss hier ein
 * echtes Consent-Banner hin.
 */

const STORAGE_KEY = "cookie-notice:v1";
const CHANGE_EVENT = "cookie-notice-change";

function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function dismiss() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
  } catch {
    // Speicher nicht verfügbar (z. B. privater Modus) – Hinweis bleibt nur für diese Seite weg.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CookieNotice() {
  // Auf dem Server gilt der Hinweis als bestätigt, damit er nicht im statischen HTML steht.
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => true);
  if (dismissed) return null;

  return (
    <section
      aria-label="Hinweis zu Cookies"
      className="fixed inset-x-0 bottom-0 z-30 border-t-4 border-raps bg-white shadow-[0_-4px_24px_rgb(20_54_50/0.15)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-[65ch]">
          Diese Website verwendet keine Tracking-Cookies. Mehr dazu in der{" "}
          <Link href="/datenschutz" className="font-bold text-kocher underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <Button variant="secondary" onClick={dismiss} className="shrink-0">
          Verstanden
        </Button>
      </div>
    </section>
  );
}
