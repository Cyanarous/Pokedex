import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import { fetchPokemonData } from './utils/pokemonAPI';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetchPokemonData(query);
      setSearchResults([response]); // wrap in array for list view
    } catch (err) {
      console.error(err);
      setSearchResults([]); // fallback to empty list
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemons={searchResults} />
    </div>
  );
}

export default App;
