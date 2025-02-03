import { AppRouteHandler } from "../../types/App";
import type { PokemonRoute } from "./pokemon.routes";
import * as HttpStatusCodes from "../../lib/httpStatusCodes";

import { Card } from "../../types/Pokemon";
import _ from "lodash";

const RANDOM_CARDS_SIZE = 5;

export const defaultHandler: AppRouteHandler<PokemonRoute> = async (c) => {
  const query = await fetch(
    "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]"
  );
  const res = await query.json();
  const cards: Card[] = res.data;
  const randomCards = _.sampleSize(cards, RANDOM_CARDS_SIZE);

  return c.json({ items: randomCards }, HttpStatusCodes.OK);
};
