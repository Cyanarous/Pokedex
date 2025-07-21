import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemonsByRegion } from '../utils/regionsAPI';

function PokemonList({ selectedRegion = 'kanto' }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemons() {
      try {
        setLoading(true);
        const data = await getPokemonsByRegion(selectedRegion);
        setPokemons(data);
      } catch (err) {
        console.error('Error loading Pokémon:', err);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, [selectedRegion]);

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {loading && <p className="text-center text-gray-600">Loading {selectedRegion} region...</p>}

      {!loading && pokemons.length === 0 && (
        <p className="text-center text-gray-600">No Pokémon found for {selectedRegion}</p>
      )}

      {pokemons.map((p) => (
        <PokemonCard
          key={p.id}
          id={p.id}
          name={p.name}
          types={p.types}
          sprite={p.sprite}
        />
      ))}
    </div>
  );
}

export default PokemonList;
