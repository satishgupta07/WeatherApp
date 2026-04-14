/**
 * @file utils/weatherThemes.js
 * @description Maps OpenWeatherMap `weather[0].main` condition names to
 * animated background gradient and blob colours for AnimatedBackground.
 *
 * All values are hex strings used in inline styles — this avoids Tailwind's
 * build-time purge removing dynamically constructed class names.
 *
 * @typedef {{ from: string, via: string, to: string, blob1: string, blob2: string, blob3: string }} WeatherTheme
 */

/** @type {Record<string, WeatherTheme>} */
const WEATHER_THEMES = {
  Clear: {
    from: "#f59e0b", via: "#f97316", to: "#0369a1",
    blob1: "#fbbf24", blob2: "#fb923c", blob3: "#7dd3fc",
  },
  Clouds: {
    from: "#475569", via: "#334155", to: "#1e293b",
    blob1: "#94a3b8", blob2: "#64748b", blob3: "#475569",
  },
  Rain: {
    from: "#1d4ed8", via: "#4338ca", to: "#1e3a5f",
    blob1: "#3b82f6", blob2: "#6366f1", blob3: "#1d4ed8",
  },
  Drizzle: {
    from: "#2563eb", via: "#4f46e5", to: "#1e3a8a",
    blob1: "#60a5fa", blob2: "#818cf8", blob3: "#2563eb",
  },
  Thunderstorm: {
    from: "#1e1b4b", via: "#312e81", to: "#0c0a1e",
    blob1: "#4c1d95", blob2: "#7c3aed", blob3: "#1e1b4b",
  },
  Snow: {
    from: "#bfdbfe", via: "#93c5fd", to: "#60a5fa",
    blob1: "#e0f2fe", blob2: "#bae6fd", blob3: "#93c5fd",
  },
  Mist: {
    from: "#374151", via: "#4b5563", to: "#1f2937",
    blob1: "#6b7280", blob2: "#9ca3af", blob3: "#4b5563",
  },
  Smoke: {
    from: "#292524", via: "#44403c", to: "#1c1917",
    blob1: "#57534e", blob2: "#78716c", blob3: "#292524",
  },
  Haze: {
    from: "#78350f", via: "#92400e", to: "#451a03",
    blob1: "#b45309", blob2: "#d97706", blob3: "#78350f",
  },
  Dust: {
    from: "#92400e", via: "#b45309", to: "#451a03",
    blob1: "#d97706", blob2: "#f59e0b", blob3: "#92400e",
  },
  Sand: {
    from: "#92400e", via: "#b45309", to: "#451a03",
    blob1: "#d97706", blob2: "#f59e0b", blob3: "#92400e",
  },
  Fog: {
    from: "#374151", via: "#4b5563", to: "#1f2937",
    blob1: "#6b7280", blob2: "#9ca3af", blob3: "#4b5563",
  },
  Ash: {
    from: "#374151", via: "#1f2937", to: "#111827",
    blob1: "#4b5563", blob2: "#6b7280", blob3: "#374151",
  },
  Tornado: {
    from: "#1e1b4b", via: "#312e81", to: "#0c0a1e",
    blob1: "#4c1d95", blob2: "#7c3aed", blob3: "#1e1b4b",
  },
};

/** Fallback theme shown on the welcome screen and for unknown conditions. */
export const DEFAULT_THEME = {
  from: "#312e81", via: "#1e1b4b", to: "#0f172a",
  blob1: "#4f46e5", blob2: "#7c3aed", blob3: "#2563eb",
};

/**
 * Return the gradient theme for the given OWM condition name.
 * Falls back to DEFAULT_THEME for null, undefined, or unmapped conditions.
 *
 * @param {string|undefined} condition - e.g. "Clear", "Rain", "Clouds"
 * @returns {WeatherTheme}
 */
export function getTheme(condition) {
  return WEATHER_THEMES[condition] ?? DEFAULT_THEME;
}
