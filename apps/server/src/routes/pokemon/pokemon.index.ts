import { createRoute } from "../../app";
import * as handlers from "./pokemon.handlers";
import * as routes from "./pokemon.routes";
const router = createRoute();
router.openapi(routes.defaultRoute, handlers.defaultHandler);
export const pokemonRouter = router;
