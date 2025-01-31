import type { ZodSchema } from "../../types/App";
import * as HttpStatusPhrases from "../httpStatusPhrases";
import { z } from "zod";

export function jsonContent<T extends ZodSchema>(
  schema: T,
  description: string
) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}

export function multipleItemsResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z.object({
    items: z.array(itemSchema),
  });
}
export function singleItemResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z.object({
    item: itemSchema,
  });
}

export function createMessageObjectSchema(exampleMessage: string) {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: exampleMessage,
      },
    });
}

export function jsonContentRequired<T extends ZodSchema>(
  schema: T,
  description: string
) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND
);
export const serverErrorSchema = createMessageObjectSchema(
  HttpStatusPhrases.INTERNAL_SERVER_ERROR
);
export const badRequestErrorSchema = createMessageObjectSchema(
  HttpStatusPhrases.BAD_REQUEST
);
export const unauthorizedErrorSchema = createMessageObjectSchema(
  HttpStatusPhrases.UNAUTHORIZED
);

export const deletedSchema = createMessageObjectSchema(
  HttpStatusPhrases.NO_CONTENT
);

export function createErrorSchema<T extends ZodSchema>(schema: T) {
  const { error } = schema.safeParse(
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
  );
  return z.object({
    success: z.boolean().openapi({
      example: false,
    }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string().optional(),
          })
        ),
        name: z.string(),
      })
      .openapi({
        example: error,
      }),
  });
}
