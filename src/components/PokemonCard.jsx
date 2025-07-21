import React from 'react';
import { useNavigate } from 'react-router-dom';
import { typeColors, getTypeBackground } from '../utils/pokemonAPI';

function PokemonCard({ name, id, sprite, types, slug }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${slug}`);
  };

  // Create gradient from typeColors (for border)
  const borderGradient =
    types?.length > 1
      ? `linear-gradient(135deg, ${typeColors[types[0]]}, ${typeColors[types[1]]})`
      : typeColors[types?.[0]] || '#ccc';

  return (
    <div
      onClick={handleClick}
      className="p-[4px] rounded-xl cursor-pointer hover:scale-105 transition-transform"
      style={{
        background: borderGradient,
      }}
    >
      <div
        className="rounded-lg h-full shadow-md p-4 w-40 flex flex-col items-center"
        style={{
          background: getTypeBackground(types || []),
          borderRadius: '8px',
        }}
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
    </div>
  );
}

export default PokemonCard;
