// import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  /*
  plugins: [
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
    }),
  ],
  */
  test: {
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
    coverage: {
      reportsDirectory: "test-coverage",
    },
  },
});
