import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonData, getTypeBackground, typeColors } from '../utils/pokemonAPI';
import StatBar from './StatBar';
import WeaknessChart from './WeaknessChart';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (!name) return;

    async function fetchData() {
      try {
        const data = await fetchPokemonData(name);
        setPokemonData(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        setPokemonData(null);
      }
    }

    fetchData();
  }, [name]);

  if (!pokemonData) return null;

  const borderBackground =
    pokemonData?.types?.length > 1
      ? `linear-gradient(135deg, ${typeColors[pokemonData.types[0]]}, ${typeColors[pokemonData.types[1]]})`
      : typeColors[pokemonData?.types?.[0]] || '#ccc';

  return (
    <div
      className="min-h-screen bg-gray-100 pt-4"
      style={{ background: getTypeBackground(pokemonData?.types || []) }}
    >
      {pokemonData?.sprite && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-1 max-w-6xl w-full">
            
            {/* Gradient Border Wrapper */}
            <div
              className="p-[4px] rounded-xl w-[45%] md:w-[45%] min-w-[200px]"
              style={{ background: borderBackground }}
            >
              <div
                className="rounded-lg flex flex-col items-center pt-4 min-h-[280px] shadow-md"
                style={{
                  background: getTypeBackground(pokemonData?.types || []),
                }}
              >
                <img
                  src={pokemonData?.sprite}
                  alt="Pokemon Sprite"
                  className="w-30 h-30 md:w-36 md:h-36 object-contain"
                />
                <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center mt-2">
                  {pokemonData?.name?.toUpperCase()} #{pokemonData?.id}
                </h2>
                <h3 className="text-xs text-center font-semibold text-gray-800">{pokemonData?.genus}</h3>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {pokemonData?.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="min-w-[80px] md:min-w-[130px] px-2 py-1 text-[8px] md:text-xs font-bold text-white text-center rounded shadow border border-black/70"
                      style={{ backgroundColor: typeColors[type] }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[45%] md:w-[50%] min-w-[180px] bg-white/70 rounded-lg p-4 min-h-[280px] flex flex-col justify-between">
              <p className="text-[10px] md:text-base font-semibold text-gray-800">
                {pokemonData?.flavorText || 'No description available.'}
              </p>
              <div className="mt-4 space-y-1 text-[10px] md:text-sm text-gray-700 font-semibold">
                <p>Weight: {pokemonData?.weight ? `${pokemonData.weight / 10}kg` : 'N/A'}</p>
                <p>Height: {pokemonData?.height ? `${pokemonData.height / 10}m` : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1 max-w-6xl w-full">
            <div className="w-full md:w-[45%] min-w-[200px] rounded shadow-md bg-white/80 flex flex-col items-center pt-4 min-h-[200px]">
              <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2">Stats</h3>
              <div className="w-full px-4 space-y-2">
                {pokemonData?.stats.map((stat, idx) => (
                  <StatBar key={idx} name={stat.name} value={stat.value} />
                ))}
                <div className="mt-2 w-full flex justify-between px-2">
                  <span className="text-[10px] font-semibold text-gray-700 uppercase pb-3">Total</span>
                  <span className="text-[10px] font-bold text-gray-900">
                    {pokemonData?.stats.reduce((total, stat) => total + stat.value, 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] min-w-[180px] bg-white/70 rounded shadow-md p-4 min-h-[200px] flex flex-col justify-start">
              {pokemonData?.types.length > 0 && <WeaknessChart types={pokemonData.types} />}
              {pokemonData?.abilities.length > 0 && (
                <ul className='flex col-auto flex-wrap gap-4 mt-4'>
                  {pokemonData.abilities.map((ability, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] md:text-sm bg-amber-50 font-semibold text-gray-800 border border-gray-500 rounded p-2"
                    >
                      {ability.charAt(0).toUpperCase() + ability.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
