import React from "react";

const DailyForecast = ({ data, forecastList }) => {
  const noDataProvided =
    !data ||
    !forecastList ||
    Object.keys(data).length === 0 ||
    data.cod === "404" ||
    forecastList.cod === "404";

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">TODAY'S FORECAST</h2>

      {noDataProvided && (
        <div className="mt-8">
          <p className="text-red-700 text-center">Error: No data available</p>
        </div>
      )}

      {!noDataProvided && forecastList.length > 0 && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecastList.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-t from-opacity-5 via-opacity-5 to-opacity-100 border border-gray-300 rounded-md shadow-md p-4 text-center transition transform hover:scale-105"
              >
                <p className="text-sm font-medium">{item.time}</p>
                <img
                  className="w-16 h-16 mx-auto my-3"
                  alt="weather"
                  src={`https://openweathermap.org/img/w/${item.icon}.png`}
                />
                <p className="text-sm font-semibold uppercase">
                  {item.temperature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!noDataProvided && forecastList && forecastList.length === 0 && (
        <div className="mt-8">
          <p className="text-teal-500 text-center">
            No available forecasts for tonight.
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
