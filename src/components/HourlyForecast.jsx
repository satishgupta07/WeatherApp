/**
 * @file components/HourlyForecast.jsx
 * @description Horizontally scrollable strip showing upcoming 3-hour forecast
 * slots for the current day (up to 6 cards).
 *
 * Each card is itself a small glass panel containing the slot time (HH:MM),
 * the OWM condition icon, and the temperature. The outer container uses the
 * `no-scrollbar` utility to hide the native scrollbar while preserving
 * touch/mouse scroll behaviour.
 *
 * When all of today's slots have already passed the API returns an empty list,
 * in which case a short message is shown instead of the strip.
 */

/**
 * HourlyForecast — today's upcoming forecast strip.
 *
 * @param {Object} props
 * @param {Array<{time: string, icon: string, temperature: string}>} props.forecastList
 *   Upcoming 3-hour slots produced by `getTodayForecastWeather`.
 */
const HourlyForecast = ({ forecastList }) => {
  if (!forecastList || forecastList.length === 0) {
    return (
      <div
        className="glass p-5 text-white/50 text-sm text-center animate-fade-in-up"
        style={{ animationDelay: "80ms" }}
      >
        No upcoming forecasts for tonight.
      </div>
    );
  }

  return (
    <div
      className="glass p-5 animate-fade-in-up"
      style={{ animationDelay: "80ms" }}
    >
      {/* Section label */}
      <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
        Today's Forecast
      </h3>

      {/* Horizontally scrollable slot strip */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {forecastList.map((slot, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-1 flex-shrink-0 glass px-4 py-3 text-white"
          >
            {/* Slot time e.g. "15:00" */}
            <span className="text-xs opacity-60">{slot.time}</span>
            {/* OWM standard-res icon */}
            <img
              src={`https://openweathermap.org/img/wn/${slot.icon}.png`}
              alt="weather"
              className="w-10 h-10"
            />
            {/* Temperature rounded to nearest degree */}
            <span className="text-sm font-medium">{slot.temperature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
