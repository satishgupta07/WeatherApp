/**
 * @file api/index.js
 * @description Centralised API layer for the WeatherApp.
 *
 * API keys are read from Vite environment variables first, falling back to
 * inline values so the app still runs without a .env file during development.
 * Before deploying publicly, move the real keys to a .env file:
 *   VITE_WEATHER_API_KEY=<your_openweathermap_key>
 *   VITE_GEO_API_KEY=<your_rapidapi_key>
 */

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY ?? "7d051e639822dfa10fb857cf07562c91";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key":
      import.meta.env.VITE_GEO_API_KEY ??
      "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

/**
 * Fetch current weather and 5-day / 3-hour forecast for a coordinate pair.
 *
 * Both requests fire in parallel via Promise.all. Throws on network failure
 * or a non-2xx HTTP status so callers can handle errors consistently.
 *
 * @param {number|string} lat - Latitude.
 * @param {number|string} lon - Longitude.
 * @returns {Promise<[Object, Object]>} [currentWeatherJson, forecastJson]
 * @throws {Error} On network failure or non-OK HTTP response.
 */
export async function fetchWeatherData(lat, lon) {
  const [weatherRes, forecastRes] = await Promise.all([
    fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ),
    fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ),
  ]);

  if (!weatherRes.ok || !forecastRes.ok) {
    throw new Error(
      `Weather API error — status: ${weatherRes.status} / ${forecastRes.status}`
    );
  }

  return Promise.all([weatherRes.json(), forecastRes.json()]);
}

/**
 * Search for cities whose names begin with `input`.
 * Filters to cities with population ≥ 10,000 to avoid micro-localities.
 *
 * @param {string} input - Partial city name typed by the user.
 * @returns {Promise<Object>} GeoDB response with a `.data` array of city objects.
 * @throws {Error} On network failure or non-OK HTTP response.
 */
export async function fetchCities(input) {
  const response = await fetch(
    `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
    GEO_API_OPTIONS
  );

  if (!response.ok) {
    throw new Error(`GeoDB API error — status: ${response.status}`);
  }

  return response.json();
}
