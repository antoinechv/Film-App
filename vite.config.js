import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/Deni-stream/",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Définit '@' comme alias pour le dossier 'src'
    }
  }
});
