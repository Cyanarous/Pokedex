import { useState } from 'react'

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonType, setPokemonType] = useState('');

  async function fetchPokemon() {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      if(!response.ok){
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;
      setPokemonSprite(pokemonSprite);

      const pokemonType = data.types.map(typeInfo => typeInfo.type.name).join(' ');
      setPokemonType(pokemonType);
    }
    catch(error){
      console.error(error);
    }
  }

  return(
    <div className="max-h-screen bg-gray-100">
      <header className="bg-blue-600 w-full py-4 flex items-center justify-center md:justify-start shadow">
        <div className="flex items-center space-x-4 md:ml-8">
          <h1 className="text-xl md:text-6xl font-bold text-white">Pokédex</h1>
          <input
            type="text"
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value)}
            placeholder="Search for a Pokémon"
            className="border p-2 rounded w-48 md:w-4xl"
          />
          <button onClick={fetchPokemon} className="bg-green-200 text-blue-600 p-2 rounded font-bold">🔍</button>
        </div>
      </header>
      <div className="flex justify-center">
        <div className="bg-green-400 rounded shadow-md w-full max-w-xl flex flex-col items-center">
          <img
            src={pokemonSprite}
            alt="Pokemon Sprite"
            id="pokemonSprite"
            style={{ display: pokemonSprite ? 'block' : 'none' }}
            className="mt-4 w-xs h-xs object-contain"
          />
          <h3 className="mt-2 text-lg font-semibold text-gray-800">{pokemonType}</h3>
        </div>
      </div>
    </div>
  );
}


export default App
