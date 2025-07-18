import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SearchBar from './components/SearchBar';

function AppWrapper() {
  const navigate = useNavigate();

  const handleSearch = (name) => {
  if (typeof name === 'string') {
    navigate(`/pokemon/${name.toLowerCase()}`);
  }
};


  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
