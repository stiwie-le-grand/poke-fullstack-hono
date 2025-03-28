import "./App.css";
import pokemonLogo from "./assets/pokemon.png";
import { EpicReveal } from "./features/EpicReveal/EpicReveal";
import { useFetchPokemon } from "./hooks/useFetchPokemon";

function App() {
  const { pokemons, refetch } = useFetchPokemon();

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col">
        <img
          src={pokemonLogo}
          className="max-w-sm select-none pointer-events-none"
          alt="React logo"
        />
        <div className="flex flex-col items-center justify-center gap-4 pb-16 w-full">
          <button
            className="w-full bg-yellow-300 p-4 rounded-2xl cursor-pointer hover:bg-yellow-400 transition-all duration-300 ease-in-out"
            onClick={() => refetch()}
          >
            Catch 'em all
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {pokemons.map((pokemon) => (
            <EpicReveal
              imageUrl={pokemon.imageUrl}
              isLegendary={pokemon.isLegendary}
              isMythical={pokemon.isMythical}
              name={pokemon.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
