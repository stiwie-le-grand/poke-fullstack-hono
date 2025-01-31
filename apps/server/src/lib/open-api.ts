import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import { AppOPenAPI } from "../types/App";

export function configureOpenAPI(app: AppOPenAPI) {
  app.doc("/openAPI", {
    openapi: "3.0.0",
    info: {
      title: "Open API documentation",
      description: "Description of the API",
      version: "1.0.0",
    },
  });

  app.get(
    "/scalar",
    apiReference({
      spec: {
        url: "/openAPI",
      },
    })
  );

  app.get(
    "/swagger",
    swaggerUI({
      url: "/openAPI",
    })
  );
}
