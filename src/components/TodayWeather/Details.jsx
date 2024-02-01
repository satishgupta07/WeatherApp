import React from "react";
import Error from "../Error";

const Details = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <div className="text-center mb-6">
        <h3 className="text-white font-bold uppercase text-2xl mb-2">
          {data.city}
        </h3>
        <h4 className="text-white text-sm opacity-70">Today</h4>
      </div>
      {!noDataProvided && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white font-bold mb-2 text-2xl">
              {Math.round(data.main.temp)} °C
            </h3>
            <h4 className="text-white text-sm opacity-70">
              {data.weather[0].description}
            </h4>
            <div className="flex justify-evenly items-center w-full mt-2">
              <div className="flex flex-col text-white text-sm mt-2">
                <p>Min</p>
                <p>{Math.round(data.main.temp_min)} °C </p>
              </div>
              <div className="flex flex-col text-white text-sm mt-2">
                <p>Min</p>
                <p>{Math.round(data.main.temp_max)} °C </p>
              </div>
            </div>
          </div>
          <img
            className="w-20 h-20 md:w-24 md:h-24 mx-auto"
            alt="weather"
            src={
              data.weather[0].icon
                ? `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
                : ""
            }
          />
        </div>
      )}
      {noDataProvided && (
        <div className="flex-1">
          <Error type="error" />
        </div>
      )}
    </div>
  );
};

export default Details;
