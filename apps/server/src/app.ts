import { OpenAPIHono } from "@hono/zod-openapi";
import { configureOpenAPI } from "./lib/open-api";
import { pokemonRouter } from "./routes/pokemon/pokemon.index";
import { AppBindings } from "./types/App";
import { cors } from "hono/cors";

const app = createRoute();

/* CRITICAL-TODO: DONT DO THIS IN PROD!! MAKE SURE TO USE SECURE CORS SETTINGS! */
app.use("/*", cors());

// configure the OpenAPI docs
configureOpenAPI(app);

// Attach routes to main router's root path, it could also be attached to /api
const routes = [pokemonRouter];
routes.forEach((route) => app.route("/", route));

export default app;

// Used to create the root app route and further subroutes
export function createRoute() {
  return new OpenAPIHono<AppBindings>({
    // last path is directory or not
    strict: false,
  });
}
