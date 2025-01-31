import { serve } from "@hono/node-server";
import env from "./env";
import app from "./app";

const port = env.PORT ?? 3000;

console.log(`API available http://${env.HOSTNAME}:${port}`);

serve({
  fetch: app.fetch,
  port,
});
