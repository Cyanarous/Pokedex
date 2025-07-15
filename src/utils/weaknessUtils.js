import typeChart from './typeChart';

export function calculateWeaknesses(pokemonTypes) {
  const allTypes = Object.keys(typeChart);
  const effectiveness = {};

  for (const attackingType of allTypes) {
    let multiplier = 1;

    for (const defenderType of pokemonTypes) {
      const typeEffect = typeChart[defenderType]?.[attackingType];
      if (typeEffect !== undefined) {
        multiplier *= typeEffect;
      }
    }

    effectiveness[attackingType] = multiplier;
  }

  return effectiveness;
}
