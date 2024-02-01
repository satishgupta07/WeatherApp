import React from "react";
import { FaWind, FaCloud, FaThermometerEmpty } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import Error from "../Error";

const AirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">AIR CONDITIONS</h2>
      {noDataProvided ? (
        <Error flex="1" type="error" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="air-conditions-item bg-blue-500 p-4 rounded-md">
            <div className="flex items-center">
              <FaThermometerEmpty className="w-6 h-6 mr-2 text-white" />
              <span className="text-sm text-white opacity-80">Real Feel</span>
            </div>
            <div className="text-lg font-semibold text-white mt-2">
              {Math.round(data.main.feels_like)} °C
            </div>
          </div>
          <div className="air-conditions-item bg-purple-500 p-4 rounded-md">
            <div className="flex items-center">
              <FaWind className="w-6 h-6 mr-2 text-white" />
              <span className="text-sm text-white opacity-80">Wind</span>
            </div>
            <div className="text-lg font-semibold text-white mt-2">
              {data.wind.speed} m/s
            </div>
          </div>
          <div className="air-conditions-item bg-green-500 p-4 rounded-md">
            <div className="flex items-center">
              <FaCloud className="w-6 h-6 mr-2 text-white" />
              <span className="text-sm text-white opacity-80">Clouds</span>
            </div>
            <div className="text-lg font-semibold text-white mt-2">
              {Math.round(data.clouds.all)} %
            </div>
          </div>
          <div className="air-conditions-item bg-yellow-500 p-4 rounded-md">
            <div className="flex items-center">
              <WiHumidity className="w-8 h-8 mr-2 text-white" />
              <span className="text-sm text-white opacity-80">Humidity</span>
            </div>
            <div className="text-lg font-semibold text-white mt-2">
              {Math.round(data.main.humidity)} %
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirConditions;
