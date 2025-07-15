import { useState } from 'react';
import { fetchPokemonData, getTypeBackground, typeColors } from './utils/pokemonAPI';
import StatBar from './components/StatBar';
import WeaknessChart from './components/WeaknessChart';


function SearchPokemon() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonID, setPokemonID] = useState('');
  const [pokemonSpecies, setPokemonSpecies] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonFlavorText, setPokemonFlavorText] = useState('');
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [pokemonStats, setPokemonStats] = useState([]);

  async function fetchPokemon() {
    try {
      const data = await fetchPokemonData(pokemonName.toLowerCase());
      setPokemonSprite(data.sprite);
      setPokemonID(data.id);
      setPokemonType(data.types);
      setPokemonWeight(data.weight);
      setPokemonHeight(data.height);
      setPokemonSpecies(data.genus);
      setPokemonFlavorText(data.flavorText);
      setPokemonStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ background: getTypeBackground(pokemonType) }}
    >
      {/* Header */}
      <header className="bg-red-500 w-full h-20 flex items-center justify-center md:justify-start shadow">
        <div className="flex items-center space-x-4 md:ml-8">
          <h1 className="text-xl md:text-6xl font-bold text-white">Pokédex</h1>
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Search for a Pokémon"
            className="border p-2 rounded w-40 md:w-80 h-10 text-sm"
          />
          <button
            onClick={fetchPokemon}
            className="bg-white text-blue-600 p-2 rounded text-2xl"
          >
            🔍
          </button>
        </div>
      </header>

      {/* Main Content */}
      {pokemonSprite && (
        <div className="flex flex-col items-center gap-6 mt-6">
          {/* Info Card */}
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl w-full px-4">
            {/* Left: Sprite and Type */}
            <div
              className="w-[40%] md:w-[45%] min-w-[160px] rounded shadow-md flex flex-col items-center p-4 min-h-[280px]"
              style={{ background: getTypeBackground(pokemonType) }}
            >
              <img
                src={pokemonSprite}
                alt="Pokemon Sprite"
                className="w-26 h-26 md:w-36 md:h-36 object-contain"
              />
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-2">
                {pokemonName.toUpperCase()} #{pokemonID}
              </h2>
              <h3 className="text-xs font-semibold text-gray-800">{pokemonSpecies}</h3>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {pokemonType.map((type, idx) => (
                  <span
                    key={idx}
                    className="min-w-[75px] md:min-w-[130px] px-2 py-1 text-[10px] md:text-xs font-bold text-white text-center rounded shadow border border-black/70"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Flavor and Misc */}
            <div className="w-[40%] md:w-[50%] min-w-[180px] bg-white/70 rounded-lg p-4 min-h-[280px] flex flex-col justify-between">
              <p className="text-[12px] md:text-base font-semibold text-gray-800">
                {pokemonFlavorText}
              </p>
              <div className="mt-4 space-y-1 text-[10px] md:text-sm text-gray-700 font-semibold">
                <p>Weight: {pokemonWeight ? `${pokemonWeight / 10}kg` : 'N/A'}</p>
                <p>Height: {pokemonHeight ? `${pokemonHeight / 10}m` : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl px-4">
            {/* Stats Section */}
            <div className="bg-white/80 rounded shadow-md p-4">
              <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemonStats.map((stat, idx) => (
                  <StatBar key={idx} name={stat.name} value={stat.value} />
                ))}
              </div>
            </div> 
            {/* end of stat section */}
            {pokemonType.length > 0 && <WeaknessChart types={pokemonType} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPokemon;
