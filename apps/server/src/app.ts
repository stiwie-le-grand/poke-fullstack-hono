import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { configureOpenAPI } from "./lib/open-api";
import { pokemonRouter } from "./routes/pokemon/pokemon.index";
import { AppBindings } from "./types/App";

const app = createRoute();

// configure the OpenAPI docs
configureOpenAPI(app);

const routes = [pokemonRouter];

routes.forEach((route) => app.route("/", route));

export default app;

// Used to create the root app route and further subroutes
export function createRoute() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}
