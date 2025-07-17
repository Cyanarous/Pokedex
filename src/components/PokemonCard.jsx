import React from 'react';
import { useNavigate } from 'react-router-dom';
import { typeColors, getTypeBackground } from '../utils/pokemonAPI';

function PokemonCard({ name, id, sprite, types }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/pokemon/${name.toLowerCase()}`);
  }

  return (
    <div
      onClick={handleClick}
      className="rounded-lg shadow-md p-4 w-40 flex flex-col items-center hover:scale-105 transition-transform"
      style={{ background: getTypeBackground(types || []) }}
    >
      <img
        src={sprite}
        alt={name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="text-sm font-bold text-gray-800 text-center">
        {name} <br />#{id}
      </h2>
      <div className="flex flex-wrap gap-1 justify-center mt-1">
        {types?.map((type, idx) => (
          <span
            key={idx}
            className="min-w-[100px] text-center text-[10px] px-2 py-[2px] rounded text-white font-semibold"
            style={{ backgroundColor: typeColors[type] || '#777' }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
