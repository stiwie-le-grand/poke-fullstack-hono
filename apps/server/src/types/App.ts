import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export interface AppBindings {
  Variables: {};
}

export type AppOPenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ZodSchema =
  // @ts-expect-error ZodUnion requires a type argument
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
