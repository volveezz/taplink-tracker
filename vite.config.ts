import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { resolveBootstrapPayload } from "./api/server/posthog-bootstrap";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        live: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview/index.html"),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "local-bootstrap-api",
      configureServer(server) {
        server.middlewares.use("/_local/bootstrap", async (request, response) => {
          try {
            const origin = `http://${request.headers.host}`;
            const url = new URL(request.url || "/_local/bootstrap", origin);
            const payload = await resolveBootstrapPayload(url.toString());
            response.statusCode = 200;
            response.setHeader("content-type", "application/json");
            response.setHeader("cache-control", "no-store");
            response.end(JSON.stringify(payload));
          } catch (error) {
            response.statusCode = 500;
            response.setHeader("content-type", "application/json");
            response.end(
              JSON.stringify({
                error: error instanceof Error ? error.message : "Failed to resolve bootstrap payload.",
              }),
            );
          }
        });
      },
    },
  ],
});
