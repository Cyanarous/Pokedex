// utils/pokemonAPI.js

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

export function getTypeBackground(types) {
  if (!types.length) return "#fff";

  if (types.length === 1) {
    return typeColors[types[0]];
  }

  const [type1, type2] = types;
  const color1 = typeColors[type1] || "#fff";
  const color2 = typeColors[type2] || "#fff";

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

export async function fetchPokemonData(pokemonName) {
  try {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);

    if (!pokemonResponse.ok || !speciesResponse.ok) {
      throw new Error("Could not fetch data");
    }

    const pokemonData = await pokemonResponse.json();
    const speciesData = await speciesResponse.json();

    const sprite = pokemonData.sprites.front_default;
    const id = pokemonData.id;
    const types = pokemonData.types.map(typeInfo => typeInfo.type.name);
    const weight = pokemonData.weight;
    const height = pokemonData.height;

    const genus = speciesData.genera.find(gen => gen.language.name === "en")?.genus || "";

    const rawText = speciesData.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "";
    const flavorText = rawText.replace(/[\n\f\r]/g, " ");

    return {
      sprite,
      id,
      types,
      weight,
      height,
      genus,
      flavorText
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { typeColors };
