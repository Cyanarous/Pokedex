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
        <div className="flex flex-col md:flex-row w-full max-w-6xl items-start">
          <div className="p-2 rounded shadow-md flex flex-col items-center w-full relative md:mr-8 md:self-stretch md:w-1/2 mx-auto"
            style={{
              minHeight: '300px',
              background: getTypeBackground(pokemonType),
            }}
          >

            <img
              src={pokemonSprite}
              alt="Pokemon Sprite"
              id="pokemonSprite"
              style={{ display: pokemonSprite ? 'block' : 'none' }}
              className="w-3xs h-3xs object-contain"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4"> 
              {pokemonName.toUpperCase() + ` #${pokemonID}`}
            </h2>
            <h3 className="text-xs font-bold text-gray-800 mt-2">{pokemonSpecies}</h3>
            <div className="flex space-x-2">
              {pokemonType.map((type, idx) => (
                <h3
                  key={idx}
                  className="p-2 w-28 text-center rounded-md mt-2 text-xs font-bold text-white shadow-xl border border-black/100"
                  style={{ backgroundColor: typeColors[type] }}
                >
                  {type}
                </h3>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white/70 items-start p-4 justify-start mt-8 md:mt-8 md:w-1/2 space-y-2 text-left">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4 md:mb-8">
              {pokemonFlavorText}
            </h3>
            <h3 className="text-md font-semibold text-xs text-gray-700">
              Weight: {pokemonWeight ? `${pokemonWeight / 10}kg` : 'N/A'}
            </h3>
            <h3 className="text-md font-semibold text-xs text-gray-700">
              Height: {pokemonHeight ? `${pokemonHeight / 10}m` : 'N/A'}
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
}


export default searchPokemon
