# Weather App

A responsive weather application built with **React 18** and **Vite**, displaying real-time current conditions and a 5-day forecast for any city in the world.

**Demo:** https://twitter.com/i/status/1760397793309454620

---

## Features

- **City search** — type-ahead search powered by the GeoDB Cities API (10,000+ cities with geo-coordinates)
- **Current conditions** — temperature, weather description, min/max, and condition icon
- **Air conditions panel** — real-feel temperature, wind speed, cloud coverage, and humidity
- **Hourly forecast** — upcoming 3-hour slots for the rest of today (up to 6 cards)
- **5-day weekly forecast** — daily averages for temperature, wind, clouds, and humidity with dominant condition icon
- **Fully responsive** — works from 320 px (mobile) up to large desktop screens

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Icons | react-icons v5 |
| City search input | react-select-async-paginate |
| Weather data | OpenWeatherMap API v2.5 |
| City geo-data | GeoDB Cities via RapidAPI |

---

## Project Structure

```
WeatherApp/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── index.js              # fetchWeatherData + fetchCities
│   ├── assets/
│   │   └── unknown.png           # Fallback weather icon
│   ├── components/
│   │   ├── Error.jsx             # Reusable error / info banner
│   │   ├── Loading.jsx           # Animated spinner
│   │   ├── Search.jsx            # Async city search dropdown
│   │   ├── index.js              # Barrel re-exports
│   │   ├── TodayWeather/
│   │   │   ├── TodayWeather.jsx  # Left-column container
│   │   │   ├── Details.jsx       # City name, temp, icon
│   │   │   ├── AirConditions.jsx # Wind, humidity, feels-like, clouds
│   │   │   └── DailyForecast.jsx # Hourly strip for today
│   │   └── WeeklyForecast/
│   │       └── WeeklyForecast.jsx # 5-day daily summary list
│   ├── utils/
│   │   ├── Data.js               # Forecast transformation helpers
│   │   ├── DateConstants.js      # DAYS array + weather description→icon map
│   │   └── DateTime.js           # Date formatting + week-day rotation
│   ├── App.jsx                   # Root component + state + search handler
│   ├── index.css                 # Tailwind directives + global styles
│   └── main.jsx                  # React DOM entry point
├── .env                          # API keys (not committed — see setup below)
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A free [OpenWeatherMap](https://openweathermap.org/api) account
- A free [RapidAPI](https://rapidapi.com) account with the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) enabled

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd WeatherApp

# 2. Install dependencies
npm install

# 3. Configure API keys (see section below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Key Setup

Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_openweathermap_key
VITE_GEO_API_KEY=your_rapidapi_key
```

Then update `src/api/index.js` to use the environment variables:

```js
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// and in GEO_API_OPTIONS headers:
"X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
```

> **Note:** Never commit real API keys to source control. The `.gitignore` already excludes `.env`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all `.js` / `.jsx` files |

---

## How It Works

1. The user types a city name into the **Search** component.
2. `fetchCities` queries GeoDB Cities and returns matching results with latitude/longitude.
3. On selection, `searchChangeHandler` in `App.jsx` calls `fetchWeatherData` with the coordinates.
4. Two OpenWeatherMap requests fire in parallel:
   - `/weather` → current conditions
   - `/forecast` → 5-day / 3-hour intervals (40 data points)
5. `getTodayForecastWeather` filters the forecast list to upcoming slots for today only.
6. `getWeekForecastWeather` groups the 40 intervals by date, computes daily averages, and selects the dominant weather description per day.
7. Results populate `TodayWeather` (left column) and `WeeklyForecast` (right column).

---

## External APIs

### OpenWeatherMap

| Endpoint | Used for |
|----------|----------|
| `GET /data/2.5/weather` | Current weather conditions |
| `GET /data/2.5/forecast` | 5-day / 3-hour forecast |

Units: metric (°C, m/s).

### GeoDB Cities (RapidAPI)

| Endpoint | Used for |
|----------|----------|
| `GET /v1/geo/cities` | City name prefix search with coordinates |

Filtered to cities with `minPopulation=10000`.
