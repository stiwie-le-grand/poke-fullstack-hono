import { AppRouteHandler } from "../../types/App";
import type { PokemonRoute } from "./pokemon.routes";
import * as HttpStatusCodes from "../../lib/httpStatusCodes";
import * as HttpStatusPhrases from "../../lib/httpStatusPhrases";

export const defaultHandler: AppRouteHandler<PokemonRoute> = async (c) => {
  return c.json({ items: [] }, HttpStatusCodes.OK);
};
