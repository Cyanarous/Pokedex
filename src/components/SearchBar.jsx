import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input);
    }
  };

  const homeClick = () => {
    navigate('/');
  }
  return (
    <header className="bg-red-500 w-full h-20 flex items-center justify-center md:justify-start shadow">
      <div className="flex items-center space-x-4 md:ml-8">
        <h1 className="text-xl md:text-6xl font-bold text-white"
        onClick={homeClick}>Pokédex</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a Pokémon"
          className="border p-2 rounded w-40 md:w-160 h-10 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-white text-blue-600 p-2 rounded text-2xl"
        >
          🔍
        </button>
      </div>
    </header>
  );
}

export default SearchBar;
