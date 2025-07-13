import { useState } from 'react';
import { fetchPokemonData, getTypeBackground, typeColors } from './utils/pokemonAPI';

function searchPokemon() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonID, setPokemonID] = useState('');
  const [pokemonSpecies, setPokemonSpecies] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonFlavorText, setPokemonFlavorText] = useState('');
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');

  async function fetchPokemon() {
    try {
      const data = await fetchPokemonData(pokemonName);
      setPokemonSprite(data.sprite);
      setPokemonID(data.id);
      setPokemonType(data.types);
      setPokemonWeight(data.weight);
      setPokemonHeight(data.height);
      setPokemonSpecies(data.genus);
      setPokemonFlavorText(data.flavorText);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    }
  }

  return(
    <div className="max-h-screen md:min-h-screen bg-gray-100" style={{ background: getTypeBackground(pokemonType) }}>
      <header className="bg-red-500 w-full h-20 flex items-center justify-center md:justify-start shadow">
        <div className="flex items-center space-x-4 md:ml-8">
          <h1 className="text-xl md:text-6xl font-bold text-white">Pokédex</h1>
          <input
            type="text"
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value)}
            placeholder="Search for a Pokémon"
            className="border p-2 rounded mr-0 w-42 h-10 md:h-13 md:w-2xl flex-"
          />
          <button onClick={fetchPokemon} className="bg-white-200 text-blue-600 p-2 rounded text-3xl">🔍</button>
        </div>
      </header>
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-row flex-wrap w-full max-w-6xl mt-6 gap-4 justify-center items-stretch">
            {/* Sprite and Type */}
            <div
                className="w-[45%] min-w-[160px] rounded shadow-md flex flex-col items-center p-4 h-full min-h-[260px]"
                style={{ background: getTypeBackground(pokemonType) }}
            >
                <img
                src={pokemonSprite}
                alt="Pokemon Sprite"
                className="w-26 h-26 md:w-36 md:h-36 object-contain"
                />
                <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center">
                {pokemonName.toUpperCase()} #{pokemonID}
                </h2>
                <h3 className="text-xs font-semibold text-gray-800">{pokemonSpecies}</h3>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                {pokemonType.map((type, idx) => (
                    <span
                    key={idx}
                    className="min-w-[60px] px-2 py-1 text-[10px] md:text-xs font-bold text-white text-center rounded shadow border border-black/70"
                    style={{ backgroundColor: typeColors[type] }}
                    >
                    {type}
                    </span>
                ))}
                </div>
            </div>

            {/* Flavor Text and Stats */}
                <div className="w-[50%] min-w-[180px] bg-white/70 rounded-lg p-4 h-full min-h-[260px] flex flex-col justify-between">
                    <p className="text-[10px] md:text-base font-semibold text-gray-800">
                    {pokemonFlavorText}
                    </p>
                    <div className="mt-auto space-y-1">
                    <p className="text-[8px] md:text-sm text-gray-700 font-semibold">
                        Weight: {pokemonWeight ? `${pokemonWeight / 10}kg` : 'N/A'}
                    </p>
                    <p className="text-[8px] md:text-sm text-gray-700 font-semibold">
                        Height: {pokemonHeight ? `${pokemonHeight / 10}m` : 'N/A'}
                    </p>
                    </div>
                </div>
            </div>

      </div>
    </div>
  );
}


export default searchPokemon
