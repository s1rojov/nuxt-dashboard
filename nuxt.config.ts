// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-10",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@ant-design-vue/nuxt"],
  css: ["./app/assets/css/main.css"],
  srcDir: "app",
  vite: {
    plugins: [tailwindcss()],
  },
});
