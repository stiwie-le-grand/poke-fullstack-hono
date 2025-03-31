import * as HttpStatusCodes from "../../lib/httpStatusCodes";
import * as HttpStatusPhrases from "../../lib/httpStatusPhrases";
import { createRoute, z } from "@hono/zod-openapi";
import {
  jsonContent,
  multipleItemsResponseSchema,
  serverErrorSchema,
  singleItemResponseSchema,
} from "../../lib/schemas/returnSchema";

export const getPokemons = createRoute({
  method: "get",
  tags: ["Pokemon"],
  request: {
    params: z.object({}),
  },
  description: "",
  summary: "",
  path: "/api/pokemon",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      multipleItemsResponseSchema(
        z.object({
          id: z.number(),
          name: z.string(),
          imageUrl: z.string(),
          isLegendary: z.boolean().optional(),
          isMythical: z.boolean().optional(),
        })
      ),
      "List of pokemons"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      serverErrorSchema,
      HttpStatusPhrases.INTERNAL_SERVER_ERROR
    ),
  },
});

export const getPokemon = createRoute({
  method: "get",
  tags: ["Pokemon"],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  description: "",
  summary: "",
  path: "/api/pokemon",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      singleItemResponseSchema(
        z.object({
          id: z.number(),
          name: z.string(),
          imageUrl: z.string(),
          isLegendary: z.boolean().optional(),
          isMythical: z.boolean().optional(),
        })
      ),
      "Pokemon to return"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      serverErrorSchema,
      HttpStatusPhrases.INTERNAL_SERVER_ERROR
    ),
  },
});
