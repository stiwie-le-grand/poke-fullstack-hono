import { AppRouteHandler } from "../../types/App";
import { getPokemons as getPokemonsRoute } from "./pokemon.routes";
import * as HttpStatusCodes from "../../lib/httpStatusCodes";

const POKEMON_ID_MIN = 1;
const POKEMON_ID_MAX = 151;

type Pokemon = {
  id: number;
  name: string;
  isLegendary: boolean;
  isMythical: boolean;
  imageUrl: string;
};

const getPokemon = async (id: number): Promise<Pokemon | null> => {
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

export const getPokemons: AppRouteHandler<typeof getPokemonsRoute> = async (
  c
) => {
  const pokemons = (
    await Promise.all(
      Array.from({ length: 5 }, () =>
        getPokemon(
          Math.floor(Math.random() * (POKEMON_ID_MAX - POKEMON_ID_MIN + 1)) +
            POKEMON_ID_MIN
        )
      )
    )
  ).filter((pokemon) => pokemon !== null);

  return c.json({ items: pokemons }, HttpStatusCodes.OK);
};
