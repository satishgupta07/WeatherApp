/**
 * @file hooks/useWeather.js
 * @description Custom hook that owns all weather state and async data-fetching
 * logic, keeping App.jsx as a pure layout/rendering concern.
 *
 * Design decisions:
 *  - `handleSearch` is wrapped in `useCallback` so Search's `onSearchChange`
 *    prop reference stays stable across parent re-renders.
 *  - Stale data is cleared at the start of each search so the UI transitions
 *    cleanly through loading state instead of briefly showing old data.
 *  - `error` is reset before each fetch so a previous failure doesn't persist
 *    when the user searches again.
 *  - `Date.now()` is used instead of `new Date()` for a more efficient Unix
 *    timestamp without creating an object.
 */

import { useState, useCallback } from "react";
import { fetchWeatherData } from "../api";
import { transformDateFormat } from "../utils/DateTime";
import { getTodayForecastWeather, getWeekForecastWeather } from "../utils/Data";
import { ALL_DESCRIPTIONS } from "../utils/DateConstants";

/**
 * @typedef {Object} WeatherState
 * @property {Object|null}  todayWeather  - Current weather from /weather endpoint, augmented with `city`.
 * @property {Array}        todayForecast - Upcoming 3-hour slots for today (from getTodayForecastWeather).
 * @property {Object|null}  weekForecast  - Processed 5-day list (from getWeekForecastWeather).
 * @property {boolean}      isLoading     - True while the API call is in-flight.
 * @property {string|null}  error         - User-facing error message, or null when healthy.
 * @property {Function}     handleSearch  - Callback to invoke when the user selects a city.
 */

/**
 * @returns {WeatherState}
 */
export function useWeather() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (selectedCity) => {
    const [lat, lon] = selectedCity.value.split(" ");

    // Transition to loading: clear stale state and any previous error
    setIsLoading(true);
    setError(null);
    setTodayWeather(null);
    setTodayForecast([]);
    setWeekForecast(null);

    try {
      const currentDate = transformDateFormat();
      const dt_now = Math.floor(Date.now() / 1000);

      const [currentWeather, forecast] = await fetchWeatherData(lat, lon);

      const todaySlots = getTodayForecastWeather(forecast, currentDate, dt_now);
      const weeklyData = getWeekForecastWeather(forecast, ALL_DESCRIPTIONS);

      setTodayWeather({ city: selectedCity.label, ...currentWeather });
      setTodayForecast(todaySlots);
      setWeekForecast({ city: selectedCity.label, list: weeklyData });
    } catch (err) {
      setError("Failed to load weather data. Please check your connection and try again.");
      console.error("[useWeather] fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { todayWeather, todayForecast, weekForecast, isLoading, error, handleSearch };
}
