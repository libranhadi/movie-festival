// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
    private: {
      supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE,
    },
    jwt_secret: process.env.SECRET_KEY,
  },
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
})