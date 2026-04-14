/**
 * @file components/WeeklyForecast/WeeklyForecast.jsx
 * @description 5-day forecast list rendered as a single glass card.
 *
 * Each row shows:
 *   - 3-letter day abbreviation (derived by rotating today's weekday)
 *   - OWM condition icon + description (description hidden on very small screens)
 *   - Daily average temperature, humidity, and wind speed
 *
 * Rows are separated by subtle `divide-y` borders. The component returns null
 * when data is unavailable so the caller can control whether to show an error.
 */

import { getWeekDays } from "../../utils/DateTime";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

/**
 * WeeklyForecast — 5-day daily summary card.
 *
 * @param {Object} props
 * @param {Object} props.data - Processed forecast: `{ city, list[] }` where
 *   each list item is the output of `getWeekForecastWeather`.
 */
const WeeklyForecast = ({ data }) => {
  const forecastDays = getWeekDays();

  if (!data?.list?.length) return null;

  return (
    <div
      className="glass p-5 animate-fade-in-up"
      style={{ animationDelay: "160ms" }}
    >
      {/* Section label */}
      <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
        5-Day Forecast
      </h3>

      <div className="divide-y divide-white/10">
        {data.list.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-3 text-white"
          >
            {/* Day + icon */}
            <div className="flex items-center gap-2 w-28">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}`}
                alt={item.description}
                className="w-8 h-8 flex-shrink-0"
              />
              <span className="text-sm font-medium">
                {forecastDays[idx]?.slice(0, 3)}
              </span>
            </div>

            {/* Condition description — hidden below 'sm' breakpoint */}
            <span className="hidden sm:block text-xs opacity-45 flex-1 text-center capitalize">
              {item.description}
            </span>

            {/* Temp, humidity, wind */}
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium w-12 text-right">
                {Math.round(item.temp)}°C
              </span>
              <span className="flex items-center gap-1 opacity-50 text-xs w-12">
                <WiHumidity className="text-base" />
                {item.humidity}%
              </span>
              <span className="flex items-center gap-1 opacity-50 text-xs hidden sm:flex">
                <FaWind className="text-xs" />
                {item.wind} m/s
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
