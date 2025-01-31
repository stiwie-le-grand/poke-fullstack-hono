import { defineConfig, defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
  input: `http://localhost:3000/oas`,
  output: "src/generated",
  // configFile: "openapi-ts.config.ts",
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
    {
      name: "@hey-api/schemas",
      type: "json",
    },
  ],
});
