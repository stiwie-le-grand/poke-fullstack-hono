import { beforeEach, describe, expect, it, vi } from "vitest";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../models/pokemon.model";
import { Context, Next } from "hono";

const mockGetPokemons = vi.fn().mockResolvedValue([
  {
    id: 1,
    name: "pikachu",
    imageUrl: "https://example.com/pikachu.png",
    isLegendary: false,
    isMythical: false,
  },
] as Pokemon[]);

const mockPokemonService = {
  getPokemons: mockGetPokemons,
};

let pokemonController: PokemonController;
let context: Context;
let next: Next = vi.fn() as unknown as Next;

beforeEach(() => {
  pokemonController = new PokemonController();
  pokemonController["pokemonService"] =
    mockPokemonService as unknown as PokemonService;
  context = {
    json: vi.fn(),
    req: {
      get: vi.fn(),
      query: vi.fn(),
      param: vi.fn(),
    },
    res: {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    },
    env: {},
    next,
  } as unknown as Context;
});

describe("PokemonController", () => {
  it("should fetch a list of Pokemon", async () => {
    const response = await pokemonController.getPokemons(context, next);
    expect(mockGetPokemons).toHaveBeenCalled();
  });
});
