import { Atkinson_Hyperlegible_Next, Bitter } from "next/font/google";

/**
 * Schriften werden von next/font beim Build heruntergeladen und selbst
 * gehostet – im Browser entstehen keine Anfragen an Google.
 */

/** Fließtext: entworfen für maximale Lesbarkeit, auch bei Sehschwäche. */
export const fontSans = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-atkinson",
  display: "swap",
  // next/font kennt für diese Schrift keine Metrik-Overrides.
  adjustFontFallback: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/** Überschriften: robuste Slab-Serif, erinnert an Laden- und Zunftschilder. */
export const fontDisplay = Bitter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bitter",
  display: "swap",
});
