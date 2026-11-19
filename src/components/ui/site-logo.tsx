import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Platzhalter-Logo. Wird durch das echte Vereinslogo ersetzt,
 * sobald es vorliegt.
 */
export function SiteLogo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-kocher";
  const sub = tone === "light" ? "text-hell" : "text-muted";
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 no-underline ${text}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="size-11 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="48" height="48" rx="8" className="fill-kocher" />
        <path
          d="M6 30c6-6 10 4 18-2s12 4 18-2"
          fill="none"
          className="stroke-raps"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M14 22V12h9M14 17h7M34 12h-6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h6v-5h-4"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold">
          {siteConfig.shortName}
        </span>
        <span className={`text-base ${sub}`}>Forchtenberg</span>
      </span>
    </Link>
  );
}
