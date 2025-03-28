import { beforeEach, describe, expect, it, vi } from "vitest";
import { advancedPokemonRouter } from "./pokemon.index";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);

beforeEach(() => {
  fetchMocker.enableMocks();
  fetchMocker.doMock();
});

describe("Pokemon API", () => {
  it("should fetch a list of Pokemon", async () => {
    const MOCK_NAME = "pikachu";
    const MOCK_IMAGE = "https://example.com/pikachu.png";

    fetchMocker.mockResponse(
      JSON.stringify({
        name: MOCK_NAME,
        is_legendary: false,
        is_mythical: false,
        sprites: {
          other: {
            dream_world: {
              front_default: MOCK_IMAGE,
            },
          },
        },
      })
    );

    const response = await advancedPokemonRouter.request(
      `/api/advanced-pokemon`
    );
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.items[0].name).toBe(MOCK_NAME);
    expect(result.items[0].imageUrl).toBe(MOCK_IMAGE);
  });
});
