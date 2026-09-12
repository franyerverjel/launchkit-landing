/**
 * Umami analytics — self-hosted at metrics.franyer.dev.
 *
 * Umami is cookieless and stores no personal data: no cookies, no
 * localStorage identifier, no cross-site profile. That is what lets
 * `/privacy` say the site sets no cookies of its own and skip a consent
 * banner under GDPR/ePrivacy. **If you swap this for a tracker that does
 * set cookies (GA, Plausible's proxy mode aside, Meta, Hotjar…), you must
 * update `src/pages/privacy.astro` §6 and add a consent gate.**
 *
 * The rendering lives in `src/components/analytics.astro`; the event
 * vocabulary is documented there.
 */
import { site } from "@/config/site"

export const analytics = {
  /** Flip to false to strip the tracker from every page. */
  enabled: true,

  /** Tracker script. Self-hosted, so no third party sees your traffic. */
  src: "https://metrics.franyer.dev/script.js",

  /** The website ID Umami issued for this site. Public by design. */
  websiteId: "cc16739d-ae70-4da4-ba64-531a178fe691",

  /**
   * Hostnames allowed to report. The tracker drops every request from a
   * hostname outside this list, which is what keeps `npm run dev`,
   * `npm run preview` and any mirror of the site out of the stats.
   *
   * Empty the array to send events from localhost while you verify new
   * event wiring — and put it back before committing.
   */
  domains: [site.domain, `www.${site.domain}`],

  /**
   * Honour the browser's Do Not Track signal and drop those visitors
   * entirely. Off by default: Umami already collects nothing personal, and
   * this audience sets DNT often enough that the stats would skew. Turning it
   * on is a one-word change — but if you advertise it on `/privacy`, it has
   * to be on here.
   */
  respectDoNotTrack: false,

  /**
   * Report real-user Web Vitals (TTFB, FCP, LCP, INP) alongside pageviews.
   * These are field measurements from actual visitors, which is what
   * Search Console grades — unlike a Lighthouse run on your own laptop.
   */
  webVitals: true,
}

export default analytics
