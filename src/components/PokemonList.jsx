import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemonsByRegion } from '../utils/regionsAPI';
import { regionRanges } from '../utils/regions';

function PokemonList({ selectedRegion, onRegionChange }) {
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
    <div className="p-4 flex flex-col items-center">
      <div className="mb-4">
        <label htmlFor="region-select" className="mr-2 font-bold">Region:</label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={e => onRegionChange(e.target.value)}
          className="border rounded p-2"
        >
          {Object.keys(regionRanges).map(region => (
            <option key={region} value={region}>{region.charAt(0).toUpperCase() + region.slice(1)}</option>
          ))}
        </select>
        {loading && <p className="text-center text-gray-600">Loading {selectedRegion} region...</p>}

        {!loading && pokemons.length === 0 && (
          <p className="text-center text-gray-600">No Pokémon found for {selectedRegion}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {pokemons.map((p) => (
          <PokemonCard
            key={p.id}
            id={p.id}
            name={p.name}
            slug={p.slug}
            types={p.types}
            sprite={p.sprite}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
