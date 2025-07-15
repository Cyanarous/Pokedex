import React from "react"; 

function StatBar({ name, value }) {
  const max = 255;
  const widthPercent = Math.min((value / max) * 100, 100);

  const statDisplayNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div className="w-full flex items-center mb-2">
      <span className="w-24 text-[10px] font-semibold text-gray-700 capitalize whitespace-nowrap">
        {statDisplayNames[name] || name}:
      </span>
      
      <div className="flex-1 h-3 bg-gray-300 rounded overflow-hidden">
        <div
          className="h-3 bg-green-500"
          style={{ width: `${widthPercent}%` }}
        />
      </div>

      <span className="ml-2 w-10 text-[10px] font-semibold text-gray-700 text-right">
        {value}
      </span>
    </div>
  );
}

export default StatBar;
