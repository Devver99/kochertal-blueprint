import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Vorgerenderte Seiten werden aus den statischen Assets des Workers
 * gelesen – ohne R2, ohne Neuvalidierung zur Laufzeit. Zeitabhängige
 * Inhalte (z. B. bevorstehende/vergangene Termine) werden daher bei
 * jedem Build neu berechnet, also bei jedem Push.
 *
 * Für echte Neuvalidierung später auf den R2-Cache umstellen:
 * https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // enableCacheInterception bleibt aus: verträgt sich nicht mit
  // Partial Prerendering (cacheComponents in next.config.ts).
});
