import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "@tailwindcss/postcss";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  css: {
    postcss: {
      plugins: [postcss],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
