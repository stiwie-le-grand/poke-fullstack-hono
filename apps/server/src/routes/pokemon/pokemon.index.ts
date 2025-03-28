import { createPartialApp } from "@/lib/createApp";
import * as handlers from "./pokemon.handlers";
import * as routes from "./pokemon.routes";

const router = createPartialApp();
router.openapi(routes.getPokemons, handlers.getPokemons);

export const pokemonRouter = router;
