import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
      reportsDirectory: "./tests/unit/coverage",
      exclude: [
        "./node_modules",
        "./tests/*",
        "./tools/*",
        "./*.ts",
        "./*.js",
        "./*.mjs",
        "./*.cjs",
        "src/types/*",
        "lambda/*",
        "node/*",
      ],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
