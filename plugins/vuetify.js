import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            // ... otros colores
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
