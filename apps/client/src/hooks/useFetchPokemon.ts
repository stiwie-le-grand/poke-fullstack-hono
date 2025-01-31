import { useQuery } from "@tanstack/react-query";
import { getApiPokemonOptions } from "../generated/@tanstack/react-query.gen";

export const useFetchPokemon = () => {
  const { data: pokemon, refetch } = useQuery(getApiPokemonOptions());

  return { pokemons: pokemon?.items ?? [], refetch };
};
