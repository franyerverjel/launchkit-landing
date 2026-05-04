// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Production URL — used by `Astro.site` to build canonical, OG, and
  // sitemap URLs as absolute. UPDATE when the production domain changes.
  site: "https://launchasaas.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
})
