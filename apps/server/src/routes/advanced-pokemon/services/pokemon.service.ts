import { Pokemon } from "../models/pokemon.model";

const POKEMON_ID_MIN = 152;
const POKEMON_ID_MAX = 251;

export class PokemonService {
  private readonly generateRandomPokeId = (
    min = POKEMON_ID_MIN,
    max = POKEMON_ID_MAX
  ): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  public getPokemon = async (id: number): Promise<Pokemon | null> => {
    try {
      const [speciesRes, detailsRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      ]);

      const [speciesData, detailsData] = await Promise.all([
        speciesRes.json(),
        detailsRes.json(),
      ]);

      return {
        id,
        name: speciesData.name,
        imageUrl:
          detailsData.sprites.other.dream_world.front_default ?? undefined,
        isLegendary: speciesData.is_legendary,
        isMythical: speciesData.is_mythical,
      };
    } catch (error) {
      console.error(`Failed to fetch Pokémon data:`, error);
      return null;
    }
  };

  public getPokemons = async (): Promise<Pokemon[]> => {
    const pokemons = (
      await Promise.all(
        Array.from({ length: 5 }, () =>
          this.getPokemon(this.generateRandomPokeId())
        )
      )
    ).filter((pokemon) => pokemon !== null);

    return pokemons;
  };
}
