import { createRoute } from "../../app";
import { PokemonController } from "./controllers/pokemon.controller";
import * as routes from "./pokemon.routes";

const pokemonController = new PokemonController();

const router = createRoute();
router.openapi(routes.getPokemons, pokemonController.getPokemons);

export const advancedPokemonRouter = router;
