import { AppRouteHandler } from "../../../types/App";
import { getPokemons } from "../pokemon.routes";
import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  private readonly pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();
  }

  public getPokemons: AppRouteHandler<typeof getPokemons> = async (c) => {
    const result = await this.pokemonService.getPokemons();
    return c.json({ items: result, message: "Pokemons fetched successfully" });
  };
}
