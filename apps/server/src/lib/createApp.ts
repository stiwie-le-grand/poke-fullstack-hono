import { OpenAPIHono } from "@hono/zod-openapi";
import { configureOpenAPI } from "@/lib/open-api";
import { AppBindings } from "@/types/App";
import { cors } from "hono/cors";

import { pokemonRouter } from "@/routes/pokemon/pokemon.index";
import { advancedPokemonRouter } from "@/routes/advanced-pokemon/pokemon.index";

export function createPartialApp() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}

export function createApp() {
  const app = createPartialApp();

  return app;
}
