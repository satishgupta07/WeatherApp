import React, { useState } from "react";
import {
  Error,
  Loading,
  Search,
  TodayWeather,
  WeeklyForecast,
} from "./components";
import { transformDateFormat } from "./utils/DateTime";
import { getTodayForecastWeather, getWeekForecastWeather } from "./utils/Data";
import { fetchWeatherData } from "./api";
import { ALL_DESCRIPTIONS } from "./utils/DateConstants";

function App() {
  // State variables to manage data, loading state, and errors
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handler function for search input change
  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(" ");

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      // Fetch weather data using API
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);

      // Process today's forecast and weekly forecast data
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      // Set state with the fetched and processed data
      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 mt-4 mb-4 md:mb-8 border rounded-lg md:shadow-md bg-orange-300">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="flex items-center mb-4">
            {/* Logo */}
            <img
              className="h-8 md:h-10 lg:h-12"
              alt="logo"
              src="https://res.cloudinary.com/satish07/image/upload/v1706720709/wthg2nxwc71daygwsfgh.png"
            />
            {/* App title */}
            <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl">
              <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Weather App
              </span>
            </h1>
          </div>
          {/* Search component */}
          <Search onSearchChange={searchChangeHandler} />
        </div>
        {/* App Content */}
        {!todayWeather || !todayForecast || !weekForecast ? (
          <div className="col-span-12 flex items-center justify-center w-full">
            {/* Placeholder message when data is not available */}
            <p className="text-2xl font-bold text-sky-600 md:text-3xl lg:text-4xl font-poppins text-center m-8 md:max-w-3xl lg:max-w-4xl">
              Explore current weather data of you city
            </p>
          </div>
        ) : (
          <>
            {/* Today's Weather */}
            <div className="col-span-12 md:col-span-6">
              <TodayWeather data={todayWeather} forecastList={todayForecast} />
            </div>
            {/* Weekly Forecast */}
            <div className="col-span-12 md:col-span-6">
              <WeeklyForecast data={weekForecast} />
            </div>
          </>
        )}

        {error && (
          // Error Component
          <Error
            margin="3rem auto"
            flex="inherit"
            errorMessage="Something went wrong"
          />
        )}

        {isLoading && (
          // Loading Component
          <div className="flex items-center justify-center w-full min-h-screen">
            <Loading value="1">
              <p className="text-xl md:text-2xl text-white opacity-80 font-poppins">
                Loading...
              </p>
            </Loading>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
