import { config } from "dotenv";
import { expand } from "dotenv-expand";
import process from "node:process";
import { z } from "zod";

// Load the `.env` file and expand the variables
expand(config());

const envSchema = z.object({
  PORT: z.coerce.number(),
  HOSTNAME: z.string().default("localhost"),
  POKEMONTCG_API_KEY: z.string(),
});

// Validate `process.env` against "envSchema"
const env = envSchema.parse(process.env);

export default env;
