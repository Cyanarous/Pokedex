import { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonData } from '../utils/pokemonAPI';
import PokemonCard from './PokemonCard';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function loadPokemonList() {
      try {
        const basicList = await fetchPokemonList(); // [{ name, url }]
        const detailedList = await Promise.all(
          basicList.map(p => fetchPokemonData(p.name))
        );
        setPokemons(detailedList);
      } catch (error) {
        console.error('Failed to load Pokémon list', error);
      }
    }

    loadPokemonList();
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          id={pokemon.id}
          sprite={pokemon.sprite}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}

export default PokemonList;
