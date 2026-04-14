/**
 * @file components/WeatherDetails.jsx
 * @description 2×2 grid of atmospheric metric tiles.
 *
 * Each tile (`Metric`) is a small glass card displaying an icon, a label, and
 * the metric's value. Animation delays are staggered so the four tiles appear
 * to cascade in from the bottom.
 *
 * Metrics displayed:
 *   - Real Feel   — `main.feels_like` (perceived temperature)
 *   - Wind        — `wind.speed` in m/s
 *   - Humidity    — `main.humidity` as percentage
 *   - Cloud Cover — `clouds.all` as percentage
 */

import { FaWind, FaCloud, FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

/**
 * Single metric tile.
 * @param {{ icon: React.ComponentType, label: string, value: string, delay: number }} props
 */
const Metric = ({ icon: Icon, label, value, delay }) => (
  <div
    className="glass p-4 flex items-start gap-3 text-white animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Icon className="text-2xl opacity-50 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-xs opacity-50 uppercase tracking-wider leading-none mb-1">
        {label}
      </p>
      <p className="text-xl font-light">{value}</p>
    </div>
  </div>
);

/**
 * WeatherDetails — 2×2 atmospheric conditions grid.
 *
 * @param {Object} props
 * @param {Object} props.data - Current weather response from OpenWeatherMap /weather.
 */
const WeatherDetails = ({ data }) => (
  <div className="animate-fade-in-up" style={{ animationDelay: "240ms" }}>
    <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3 px-1">
      Air Conditions
    </h3>
    <div className="grid grid-cols-2 gap-3">
      <Metric
        icon={FaThermometerHalf}
        label="Real Feel"
        value={`${Math.round(data.main.feels_like)}°C`}
        delay={260}
      />
      <Metric
        icon={FaWind}
        label="Wind"
        value={`${data.wind.speed} m/s`}
        delay={280}
      />
      <Metric
        icon={WiHumidity}
        label="Humidity"
        value={`${Math.round(data.main.humidity)} %`}
        delay={300}
      />
      <Metric
        icon={FaCloud}
        label="Cloud Cover"
        value={`${Math.round(data.clouds.all)} %`}
        delay={320}
      />
    </div>
  </div>
);

export default WeatherDetails;
