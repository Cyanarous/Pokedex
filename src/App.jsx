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

  //pokemon typing color 
  const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function getTypeBackground(types) {
  if (!types.length) return "#fff";

  if (types.length === 1) {
    return typeColors[types[0]];
  }

  const [type1, type2] = types;
  const color1 = typeColors[type1] || "#fff";
  const color2 = typeColors[type2] || "#fff";

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

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

      const rawText = flavorTextData.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || '';
      const cleanedText = rawText.replace(/[\n\f\r]/g, ' ');
      setPokemonFlavorText(cleanedText);

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


export default App
