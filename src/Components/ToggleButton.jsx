import React from "react";

const TemperatureToggleButton = ({ toggleUnit, unit }) => {
  return (
    <button
      onClick={toggleUnit}
      className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
    >
      {unit ? "°F" : "°C"}
    </button>
  );
};

export default TemperatureToggleButton;