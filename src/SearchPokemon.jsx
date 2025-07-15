import { useState } from 'react';
import { fetchPokemonData, getTypeBackground, typeColors } from './utils/pokemonAPI';
import StatBar from './components/StatBar';
import WeaknessChart from './components/WeaknessChart';

function SearchPokemon() {
  const [searchInput, setSearchInput] = useState('');
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
      const data = await fetchPokemonData(searchInput.toLowerCase());
      setPokemonName(data.name);
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
      <header className="bg-red-500 w-full h-20 flex items-center justify-center md:justify-start shadow">
        <div className="flex items-center space-x-4 md:ml-8">
          <h1 className="text-xl md:text-6xl font-bold text-white">Pokédex</h1>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a Pokémon"
            className="border p-2 rounded w-40 md:w-160 h-10 text-sm"
          />
          <button
            onClick={fetchPokemon}
            className="bg-white text-blue-600 p-2 rounded text-2xl"
          >
            🔍
          </button>
        </div>
      </header>
      {pokemonSprite && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="flex flex-wrap justify-center gap-1 max-w-6xl w-full">
            <div
              className="w-[45%] md:w-[45%] min-w-[200px] rounded flex flex-col items-center pt-4 min-h-[280px]"
              style={{ background: getTypeBackground(pokemonType) }}
            >
              <img
                src={pokemonSprite}
                alt="Pokemon Sprite"
                className="w-30 h-30 md:w-36 md:h-36 object-contain"
              />
              <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-2">
                {pokemonName ? pokemonName.toUpperCase() : ''} #{pokemonID}
              </h2>
              <h3 className="text-xs font-semibold text-gray-800">{pokemonSpecies}</h3>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {pokemonType.map((type, idx) => (
                  <span
                    key={idx}
                    className="min-w-[80px] md:min-w-[130px] px-2 py-1 text-[8px] md:text-xs font-bold text-white text-center rounded shadow border border-black/70"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-[45%] md:w-[50%] min-w-[180px] bg-white/70 rounded-lg p-4 min-h-[280px] flex flex-col justify-between">
              <p className="text-[10px] md:text-base font-semibold text-gray-800">
                {pokemonFlavorText}
              </p>
              <div className="mt-4 space-y-1 text-[10px] md:text-sm text-gray-700 font-semibold">
                <p>Weight: {pokemonWeight ? `${pokemonWeight / 10}kg` : 'N/A'}</p>
                <p>Height: {pokemonHeight ? `${pokemonHeight / 10}m` : 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1 max-w-6xl w-full">
            <div className="w-full md:w-[45%] min-w-[200px] rounded shadow-md bg-white/80 flex flex-col items-center pt-4 min-h-[200px]">
              <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2">Stats</h3>
              <div className="w-full px-4 space-y-2">
                {pokemonStats.map((stat, idx) => (
                  <StatBar key={idx} name={stat.name} value={stat.value} />
                ))}
                <div className="mt-4 w-full flex justify-between px-2">
                  <span className="text-[10px] font-semibold text-gray-700 uppercase pb-3">Total</span>
                  <span className="text-[10px] font-bold text-gray-900">
                    {pokemonStats.reduce((total, stat) => total + stat.value, 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] min-w-[180px] bg-white/70 rounded-lg shadow-md p-4 min-h-[200px] flex flex-col justify-start">
              {pokemonType.length > 0 && <WeaknessChart types={pokemonType} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPokemon;
