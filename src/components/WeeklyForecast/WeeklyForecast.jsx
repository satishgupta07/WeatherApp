import React from "react";
import Error from "../Error";
import { getWeekDays } from "../../utils/DateTime";
import { MdDeviceThermostat, MdFilterDrama } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const WeeklyForecast = ({ data }) => {
  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  if (noDataProvided) {
    return (
      <div className="w-full">
        <div className="bg-gray-100 p-4 rounded-md">
          <Error type="error" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4">WEEKLY FORECAST</div>

      <div className="flex flex-col items-center">
        {data.list.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex items-center justify-evenly p-4 bg-gradient-to-r from-opacity-5 to-opacity-5 shadow-md rounded-md mb-4"
          >
            <div className="flex flex-col items-start mr-4">
              <div className="text-base font-medium">{forecastDays[idx]}</div>
              <div className="flex items-center">
                <img
                  className="w-8 h-auto mr-2"
                  src={`https://openweathermap.org/img/w/${item.icon}`}
                  alt="weather"
                />
                <div className="text-lg font-medium">{item.description}</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-2">
                <MdDeviceThermostat className="text-gray-600" />
                <span className="text-gray-700">
                  {Math.round(item.temp)} °C
                </span>
              </div>
              <div className="flex items-center">
                <MdFilterDrama className="text-gray-600" />
                <span className="text-gray-700">{item.clouds} %</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-2">
                <FaWind className="text-green-500" />
                <span className="text-green-500">{item.wind} m/s</span>
              </div>
              <div className="flex items-center">
                <WiHumidity className="text-green-500" />
                <span className="text-green-500">{item.humidity} %</span>
              </div>
            </div>
          </div>
        ))}
        {data.list.length === 5 && (
          <div className="w-full flex items-center p-4 bg-gradient-to-r from-opacity-5 to-opacity-5 shadow-md rounded-md mb-4">
            <div className="flex flex-col items-start mr-4">
              <div className=" text-base font-medium">{forecastDays[5]}</div>
              <div className="flex items-center">
                <img
                  className="w-8 h-auto mr-2"
                  src="../../assets/unknown.png"
                  alt="unknown weather"
                />
                <div className="text-lg font-medium">NaN</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyForecast;
