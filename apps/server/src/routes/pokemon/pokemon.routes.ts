import * as HttpStatusCodes from "../../lib/httpStatusCodes";
import * as HttpStatusPhrases from "../../lib/httpStatusPhrases";
import { createRoute, z } from "@hono/zod-openapi";
import {
  jsonContent,
  multipleItemsResponseSchema,
  serverErrorSchema,
} from "../../lib/schemas/returnSchema";
import { cardSchema } from "../../types/Pokemon";

export const defaultRoute = createRoute({
  method: "get",
  tags: ["Pokemon"],
  /*   request: {
    params: z.object({}),
  }, */
  description: "",
  summary: "",
  path: "/api/pokemon/random-5",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      multipleItemsResponseSchema(cardSchema),
      "List of match metadata"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      serverErrorSchema,
      HttpStatusPhrases.INTERNAL_SERVER_ERROR
    ),
  },
});

export type PokemonRoute = typeof defaultRoute;
