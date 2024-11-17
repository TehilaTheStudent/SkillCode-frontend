export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/ui", "@vueuse/nuxt"],

  ui: {
    safelistColors: ["primary", "red", "orange", "green"],
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://localhost:8080/skillcode',
    },
  },
  colorMode: {
    disableTransition: true,
  },

  routeRules: {
    "/": { prerender: true },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  compatibilityDate: "2024-07-11",
});
