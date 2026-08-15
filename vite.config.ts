import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Servi depuis https://<user>.github.io/learning-languages/ en production
  // (site de projet GitHub Pages).
  base: command === "build" ? "/learning-languages/" : "/",
  plugins: [react()],
}));
