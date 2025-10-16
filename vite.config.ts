import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base: "/fastlane-leaderboard/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Target is your backend API
      "/api": {
        target: "https://www.racefacer.com/ajax",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
