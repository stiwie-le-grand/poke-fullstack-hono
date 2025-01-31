import { createPartialApp } from "@/lib/createApp";
import { PokemonController } from "./controllers/pokemon.controller";
import { getPokemons } from "./pokemon.routes";

const pokemonController = new PokemonController();

const router = createPartialApp();
router.openapi(getPokemons, pokemonController.getPokemons);

export const advancedPokemonRouter = router;
