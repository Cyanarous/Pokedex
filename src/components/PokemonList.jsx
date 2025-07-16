import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons = []}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {pokemons.map((pokemon) => (
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
