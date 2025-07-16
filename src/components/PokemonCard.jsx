import React from 'react';
import { typeColors } from '../utils/pokemonAPI';

function PokemonCard({ name, id, sprite, types }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-40 flex flex-col items-center hover:scale-105 transition-transform">
      <img
        src={sprite}
        alt={name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="text-sm font-bold text-gray-800 text-center">
        {name?.toUpperCase()} <br />#{id}
      </h2>
      <div className="flex flex-wrap gap-1 justify-center mt-1">
        {types?.map((type, idx) => (
          <span
            key={idx}
            className="text-[10px] px-2 py-[2px] rounded text-white font-semibold"
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
