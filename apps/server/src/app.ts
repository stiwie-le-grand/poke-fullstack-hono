import { cors } from "hono/cors";
import { createApp } from "./lib/createApp";
import { configureOpenAPI } from "./lib/open-api";
import { pokemonRouter } from "./routes/pokemon/pokemon.index";
import { advancedPokemonRouter } from "./routes/advanced-pokemon/pokemon.index";

const app = createApp();

/* CRITICAL-TODO: DONT DO THIS IN PROD!! MAKE SURE TO USE SECURE CORS SETTINGS! */
app.use("/*", cors());

// configure the OpenAPI docs
configureOpenAPI(app);

// Attach routes to main router's root path, it could also be attached to /api
const routes = [pokemonRouter, advancedPokemonRouter];
routes.forEach((route) => app.route("/", route));

export default app;
