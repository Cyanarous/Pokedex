import { useState } from 'react'

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonID, setPokemonID] = useState('');
  const [pokemonSpecies, setPokemonSpecies] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonFlavorText, setPokemonFlavorText] = useState('');
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');

  async function fetchPokemon() {
    try{
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      const flavorTextResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      if(!pokemonResponse.ok && !speciesResponse.ok && !flavorTextResponse.ok){
        throw new Error('Could not fetch data');
      }
      const pokemonData = await pokemonResponse.json();
      const speciesData = await speciesResponse.json();
      const flavorTextData = await flavorTextResponse.json();
      
      const pokemonSprite = pokemonData.sprites.front_default;
      setPokemonSprite(pokemonSprite);

      const pokeomonFlavorText  = flavorTextData.flavor_text_entries.find(e => e.language.name === "en");
      setPokemonFlavorText(pokeomonFlavorText ? pokeomonFlavorText.flavor_text : '');

      const pokemonID = pokemonData.id;
      setPokemonID(pokemonID);

      const typesArray = pokemonData.types.map(typeInfo => typeInfo.type.name);
      setPokemonType(typesArray);

      const weight = pokemonData.weight;
      setPokemonWeight(weight); 
      const height = pokemonData.height;
      setPokemonHeight(height);

      const speciesGenusObj = speciesData.genera.find(gen => gen.language.name === "en");
      const speciesGenus = speciesGenusObj ? speciesGenusObj.genus : "";
      setPokemonSpecies(speciesGenus);
    }
    catch(error){
      console.error(error);
    }
  }

  return(
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-500 w-full flex items-center justify-center md:justify-start shadow">
        <div className="flex items-center space-x-4 md:ml-8">
          <h1 className="text-xl md:text-6xl font-bold text-white">Pokédex</h1>
          <input
            type="text"
            value={pokemonName}
            onChange={e => setPokemonName(e.target.value)}
            placeholder="Search for a Pokémon"
            className="border p-2 rounded mr-0 w-40 md:w-2xl flex-"
          />
          <button onClick={fetchPokemon} className="bg-white-200 text-blue-600 p-2 rounded text-3xl">🔍</button>
        </div>
      </header>
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl items-start">
          <div className="bg-green-400 p-2 rounded shadow-md flex flex-col items-center relative md:mr-8 md:self-stretch md:w-1/2 mx-auto" style={{ minHeight: '300px' }}>
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
            <div className='flex space-x-2'>
              {pokemonType.map((type, idx) => (
                <h3
                  key={idx}
                  className="p-2 w-28 text-center rounded-md mt-2 text-xs font-semibold text-gray-800 bg-blue-200"
                >
                  {type}
                </h3>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start pl-2 justify-start mt-8 md:mt-8 md:w-1/2 space-y-2 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-8">
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


export default App
