import React from "react";
import { calculateWeaknesses } from "../utils/weaknessUtils";
import { typeColors } from "../utils/pokemonAPI";

function WeaknessChart({ types }) {
  const effectiveness = calculateWeaknesses(types);

  // Only include attacking types that deal MORE than 1x damage
  const weaknesses = Object.entries(effectiveness).filter(
    ([_, multiplier]) => multiplier > 1
  );

  return (
    <div className="mt-4">
      <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2">Weaknesses</h3>
      {weaknesses.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {weaknesses.map(([type, multiplier]) => (
            <div
              key={type}
              className="px-3 py-1 text-sm rounded text-white font-semibold shadow"
              style={{ backgroundColor: typeColors[type] || "#aaa" }}
            >
              {type} ×{multiplier}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No weaknesses</p>
      )}
    </div>
  );
}

export default WeaknessChart;
