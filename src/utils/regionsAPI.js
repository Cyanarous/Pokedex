import { regionRanges } from './regions';
import { fetchPokemonData } from './pokemonAPI';

export async function getPokemonsByRegion(region) {
  const range = regionRanges[region?.toLowerCase()];
  if (!range) throw new Error(`Unknown region: ${region}`);

  const promises = [];
  for (let id = range.start; id <= range.end; id++) {
    promises.push(fetchPokemonData(id.toString()));
  }

  return Promise.all(promises);
}
