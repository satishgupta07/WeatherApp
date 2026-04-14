/**
 * @file components/WeatherHero.jsx
 * @description Primary weather card — shows the most prominent weather
 * information for the selected city in an Apple Weather-inspired layout:
 *   - City name (upper-left, small caps)
 *   - Giant thin temperature (left column)
 *   - High-resolution OWM condition icon (right column)
 *   - Condition description, feels-like, and H/L row beneath
 *
 * Uses the 2x OWM icon CDN URL for crisp display on retina screens.
 */

/**
 * WeatherHero — hero temperature card.
 *
 * @param {Object} props
 * @param {Object} props.data - Current weather response with `city` label injected.
 *   Required fields: `city`, `main.temp`, `main.feels_like`, `main.temp_max`,
 *   `main.temp_min`, `weather[0].description`, `weather[0].icon`.
 */
const WeatherHero = ({ data }) => {
  const iconUrl = data.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <div className="glass p-6 text-white animate-fade-in-up">
      {/* City name */}
      <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-1">
        {data.city}
      </p>

      {/* Temperature + icon */}
      <div className="flex items-center justify-between">
        <div>
          {/* Large thin temperature — Apple Weather style */}
          <div className="text-8xl font-thin leading-none tracking-tighter">
            {Math.round(data.main.temp)}°
          </div>
          {/* Condition description */}
          <p className="text-base font-light opacity-75 mt-2 capitalize">
            {data.weather[0].description}
          </p>
        </div>

        {/* High-res condition icon */}
        {iconUrl && (
          <img
            src={iconUrl}
            alt={data.weather[0].description}
            className="w-24 h-24 drop-shadow-lg"
          />
        )}
      </div>

      {/* Secondary row — feels-like, H, L */}
      <div className="flex items-center gap-5 mt-4 text-sm opacity-60 font-light">
        <span>Feels like {Math.round(data.main.feels_like)}°</span>
        <span>H: {Math.round(data.main.temp_max)}°</span>
        <span>L: {Math.round(data.main.temp_min)}°</span>
      </div>
    </div>
  );
};

export default WeatherHero;
