// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt'],
  css: ["@/assets/css/tailwind.css", 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  plugins: ["~/plugins/mdi-icons.js", "~/plugins/vuetify.js"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify(),
    ],
  },
});
