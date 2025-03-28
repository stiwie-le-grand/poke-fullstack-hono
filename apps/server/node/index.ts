import { serve } from "@hono/node-server";
import env from "../src/env";
import app from "../src/app";

const port = env.PORT ?? 3000;

console.log(`API available @ http://${env.HOSTNAME}:${port}`);
console.log(`API OAS schema available @ http://${env.HOSTNAME}:${port}/oas`);
console.log(`Swagger UI available @ http://${env.HOSTNAME}:${port}/swagger`);
console.log(`Scalar UI available @ http://${env.HOSTNAME}:${port}/scalar`);

serve({
  fetch: app.fetch,
  port,
});
