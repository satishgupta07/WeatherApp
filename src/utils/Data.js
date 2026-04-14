/**
 * @file utils/Data.js
 * @description Pure utility functions for transforming raw OpenWeatherMap
 * forecast responses into the shape expected by the UI components.
 *
 * The OpenWeatherMap /forecast endpoint returns 40 data points spaced 3 hours
 * apart over 5 days. These helpers group, average, and filter that raw list
 * to produce:
 *   - A daily summary list for the WeeklyForecast component
 *   - An hourly list for the DailyForecast (today only) component
 */

/**
 * Higher-order function that groups an array of objects by the value of a
 * given key, omitting that key from the grouped entries.
 *
 * @param {string} key - The property name to group by.
 * @returns {(array: Object[]) => Record<string, Object[]>} A function that
 *   accepts an array and returns an object keyed by unique values of `key`.
 *
 * @example
 * const groupByDate = groupBy("date");
 * groupByDate([{ date: "2024-01-01", temp: 5 }, { date: "2024-01-01", temp: 7 }]);
 * // → { "2024-01-01": [{ temp: 5 }, { temp: 7 }] }
 */
export function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
}

/**
 * Calculate the arithmetic mean of a numeric array.
 *
 * @param {number[]} array   - Array of numbers to average.
 * @param {boolean} [isRound=true] - When true the result is rounded to the
 *   nearest integer; when false it is fixed to 2 decimal places.
 * @returns {number|string} The average value (integer when isRound is true,
 *   fixed-decimal string when false).
 */
export function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}

/**
 * Find the most frequently occurring value in an array of strings.
 *
 * Used to pick the "dominant" weather description for a given day from a set
 * of 3-hour interval descriptions (e.g. if 5 of 8 intervals show "light rain",
 * that becomes the day's representative description).
 *
 * @param {string[]} arr - Array of weather description strings.
 * @returns {string} The description that appears most often.
 */
export function getMostFrequentWeather(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

/**
 * Map a weather description string to its corresponding icon filename.
 *
 * Looks up `desc` in the provided `descriptions_list` (sourced from
 * `DateConstants.ALL_DESCRIPTIONS`) and returns the associated icon name.
 * Falls back to "unknown" if no match is found.
 *
 * @param {string} desc - A weather description string (e.g. "light rain").
 * @param {Array<{description: string, icon: string}>} descriptions_list
 *   - The full mapping of descriptions to icon filenames.
 * @returns {string} The icon filename (e.g. "10d.png") or "unknown".
 */
export const descriptionToIconName = (desc, descriptions_list) => {
  let iconName = descriptions_list.find((item) => item.description === desc);
  return iconName.icon || "unknown";
};

/**
 * Transform the raw 5-day / 3-hour forecast response into a per-day summary
 * list consumed by the WeeklyForecast component.
 *
 * Steps:
 *  1. Iterate all 40 forecast intervals, collecting temperature, humidity,
 *     wind, cloud coverage, and description per calendar date.
 *  2. Group intervals by date using `groupBy`.
 *  3. For each day, determine the most frequent weather description.
 *  4. Average temperature, humidity, wind speed, and cloud coverage for
 *     each day.
 *  5. Resolve the icon filename for the day's dominant description.
 *
 * Returns an empty array for invalid / 404 responses.
 *
 * @param {Object} response          - Raw JSON from the OpenWeatherMap /forecast endpoint.
 * @param {Array<{description: string, icon: string}>} descriptions_list
 *   - Icon-to-description mapping from `DateConstants.ALL_DESCRIPTIONS`.
 * @returns {Array<{date: string, temp: number, humidity: number, wind: string,
 *   clouds: number, description: string, icon: string}>}
 *   One entry per calendar day covered by the forecast.
 */
export const getWeekForecastWeather = (response, descriptions_list) => {
  let foreacast_data = [];
  let descriptions_data = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item, idx) => {
      descriptions_data.push({
        description: item.weather[0].description,
        date: item.dt_txt.substring(0, 10),
      });
      foreacast_data.push({
        date: item.dt_txt.substring(0, 10),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        clouds: item.clouds.all,
      });

      return { idx, item };
    });

  const groupByDate = groupBy("date");
  let grouped_forecast_data = groupByDate(foreacast_data);
  let grouped_forecast_descriptions = groupByDate(descriptions_data);

  const description_keys = Object.keys(grouped_forecast_descriptions);

  // Build a list of the most frequent description for each day
  let dayDescList = [];

  description_keys.forEach((key) => {
    let singleDayDescriptions = grouped_forecast_descriptions[key].map(
      (item) => item.description
    );
    let mostFrequentDescription = getMostFrequentWeather(singleDayDescriptions);
    dayDescList.push(mostFrequentDescription);
  });

  const forecast_keys = Object.keys(grouped_forecast_data);
  let dayAvgsList = [];

  // Compute daily averages for all numeric weather metrics
  forecast_keys.forEach((key, idx) => {
    let dayTempsList = [];
    let dayHumidityList = [];
    let dayWindList = [];
    let dayCloudsList = [];

    for (let i = 0; i < grouped_forecast_data[key].length; i++) {
      dayTempsList.push(grouped_forecast_data[key][i].temp);
      dayHumidityList.push(grouped_forecast_data[key][i].humidity);
      dayWindList.push(grouped_forecast_data[key][i].wind);
      dayCloudsList.push(grouped_forecast_data[key][i].clouds);
    }

    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false), // kept as decimal for precision
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
      icon: descriptionToIconName(dayDescList[idx], descriptions_list),
    });
  });

  return dayAvgsList;
};

/**
 * Extract upcoming 3-hour forecast slots for the current calendar day,
 * used to populate the DailyForecast (hourly strip) component.
 *
 * Only intervals whose Unix timestamp (`item.dt`) is strictly greater than
 * the current time are included, so past slots are excluded.
 * Result is capped at 6 entries; if fewer than 7 are available all are returned.
 *
 * Returns an empty array for invalid / 404 responses.
 *
 * @param {Object} response          - Raw JSON from the OpenWeatherMap /forecast endpoint.
 * @param {string} current_date      - Today's date as "YYYY-MM-DD HH:MM:SS" (from `transformDateFormat`).
 * @param {number} current_datetime  - Current time as a Unix timestamp in seconds.
 * @returns {Array<{time: string, icon: string, temperature: string}>}
 *   Up to 6 upcoming forecast slots for today, each with a "HH:MM" time,
 *   an OWM icon code, and a formatted temperature string.
 */
export const getTodayForecastWeather = (
  response,
  current_date,
  current_datetime
) => {
  let all_today_forecasts = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list.slice().map((item) => {
      // Only include slots that fall on today's date and are in the future
      if (item.dt_txt.startsWith(current_date.substring(0, 10))) {
        if (item.dt > current_datetime) {
          all_today_forecasts.push({
            time: item.dt_txt.split(" ")[1].substring(0, 5),
            icon: item.weather[0].icon,
            temperature: Math.round(item.main.temp) + " °C",
          });
        }
      }
      return all_today_forecasts;
    });

  // Return at most 6 slots; slice from the end to keep the latest ones
  if (all_today_forecasts.length < 7) {
    return [...all_today_forecasts];
  } else {
    return all_today_forecasts.slice(-6);
  }
};
