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

const typePastelColors = {
  normal: "#E2E2C3",
  fire: "#FFD4B5",
  water: "#C3D9FF",
  electric: "#FFF3B0",
  grass: "#D3F2C4",
  ice: "#D6F2F2",
  fighting: "#F2B1AE",
  poison: "#E5C3E9",
  ground: "#F2E1B5",
  flying: "#DAD4F7",
  psychic: "#FFC9DE",
  bug: "#E2F0AA",
  rock: "#E0D8AA",
  ghost: "#D7C6EB",
  dragon: "#C9B5FF",
  dark: "#D0C4B9",
  steel: "#E0E0F0",
  fairy: "#F6CCE5",
};

export function getTypeBackground(types) {
  if (!types.length) return "#fff";

  if (types.length === 1) {
    return typePastelColors[types[0]] || "#f5f5f5";
  }

  const [type1, type2] = types;
  const color1 = typePastelColors[type1] || "#f5f5f5";
  const color2 = typePastelColors[type2] || "#f5f5f5";

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}


export async function fetchPokemonData(pokemonName) {
  try {

    const sanitizedQuery = pokemonName.trim().toLowerCase().replace(/\s+/g, '-');
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${sanitizedQuery}`);
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${sanitizedQuery}`);

    if (!pokemonResponse.ok || !speciesResponse.ok) {
      throw new Error("Could not fetch data");
    }

    const pokemonData = await pokemonResponse.json();
    const speciesData = await speciesResponse.json();

    //clean name
    const displayName = pokemonData.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const sprite = pokemonData.sprites.front_default;
    const id = pokemonData.id;
    const types = pokemonData.types.map(typeInfo => typeInfo.type.name);
    const weight = pokemonData.weight;
    const height = pokemonData.height;

    const genus = speciesData.genera.find(gen => gen.language.name === "en")?.genus || "";

    const rawText = speciesData.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "";
    const flavorText = rawText.replace(/[\n\f\r]/g, " ");

    const stats = pokemonData.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));

    return {
      name: displayName,  // ✔ Clean name for display
      sprite,
      id,
      types,
      weight,
      height,
      genus,
      flavorText,
      stats,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function fetchPokemonList(limit = 151) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await response.json();
  const results = data.results;

  // Fetch full details for each Pokémon in parallel
  const detailedData = await Promise.all(
    results.map((pokemon) => fetchPokemonData(pokemon.name))
  );

  return detailedData;
}

export { typeColors };
