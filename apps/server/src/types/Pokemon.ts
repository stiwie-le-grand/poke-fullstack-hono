import { z } from "zod";

export const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
  supertype: z.string(),
  subtypes: z.array(z.string()),
  hp: z.string(),
  types: z.array(z.string()),
  evolvesTo: z.array(z.string()),
  rules: z.array(z.string()),
  attacks: z.array(
    z.object({
      name: z.string(),
      cost: z.array(z.string()),
      convertedEnergyCost: z.number(),
      damage: z.string(),
      text: z.string(),
    })
  ),
  weaknesses: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    })
  ),
  retreatCost: z.array(z.string()),
  convertedRetreatCost: z.number(),
  set: z.object({
    id: z.string(),
    name: z.string(),
    series: z.string(),
    printedTotal: z.number(),
    total: z.number(),
    legalities: z.object({
      unlimited: z.string(),
      expanded: z.string(),
    }),
    ptcgoCode: z.string(),
    releaseDate: z.string(),
    updatedAt: z.string(),
    images: z.object({
      symbol: z.string(),
      logo: z.string(),
    }),
  }),
  number: z.string(),
  artist: z.string(),
  rarity: z.string(),
  nationalPokedexNumbers: z.array(z.number()),
  legalities: z.object({
    unlimited: z.string(),
    expanded: z.string(),
  }),
  images: z.object({
    small: z.string(),
    large: z.string(),
  }),
  tcgplayer: z.object({
    url: z.string(),
    updatedAt: z.string(),
    prices: z.object({
      holofoil: z.object({
        low: z.number(),
        mid: z.number(),
        high: z.number(),
        market: z.number(),
        directLow: z.number(),
      }),
    }),
  }),
});

export type Card = z.infer<typeof cardSchema>;
