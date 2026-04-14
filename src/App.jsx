/**
 * @file App.jsx
 * @description Root application component.
 *
 * Responsibilities:
 *   1. Delegate all state and API logic to the `useWeather` hook.
 *   2. Derive the current weather condition for the animated background.
 *   3. Render one of four mutually exclusive content states:
 *        loading   → LoadingSkeleton
 *        error     → ErrorMessage
 *        idle      → WelcomeScreen
 *        data      → WeatherHero + HourlyForecast + WeeklyForecast + WeatherDetails
 *
 * App.jsx is intentionally thin — it handles layout and conditional rendering
 * only. Business logic lives in the hook; visual logic lives in components.
 */

import { useWeather } from "./hooks/useWeather";
import {
  AnimatedBackground,
  Search,
  WelcomeScreen,
  LoadingSkeleton,
  WeatherHero,
  HourlyForecast,
  WeeklyForecast,
  WeatherDetails,
  ErrorMessage,
} from "./components";

function App() {
  const {
    todayWeather,
    todayForecast,
    weekForecast,
    isLoading,
    error,
    handleSearch,
  } = useWeather();

  // Derive condition for weather-reactive background (e.g. "Clear", "Rain")
  const condition = todayWeather?.weather?.[0]?.main;
  const hasData = Boolean(todayWeather && weekForecast);

  return (
    <>
      {/* Full-screen animated gradient — changes colour with weather condition */}
      <AnimatedBackground condition={condition} />

      <main className="min-h-screen px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-lg space-y-4">

          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="flex items-center gap-3 pb-1">
            <img
              className="h-9 drop-shadow"
              alt="Weather App logo"
              src="https://res.cloudinary.com/satish07/image/upload/v1706720709/wthg2nxwc71daygwsfgh.png"
            />
            <h1 className="text-xl font-semibold text-white tracking-wide">
              Weather App
            </h1>
          </header>

          {/* ── Search ─────────────────────────────────────────────── */}
          <Search onSearchChange={handleSearch} />

          {/* ── Content (mutually exclusive states) ────────────────── */}
          {isLoading && <LoadingSkeleton />}

          {!isLoading && error && <ErrorMessage message={error} />}

          {!isLoading && !error && !hasData && <WelcomeScreen />}

          {!isLoading && !error && hasData && (
            <div className="space-y-4">
              {/* Hero — city, temperature, condition icon */}
              <WeatherHero data={todayWeather} />

              {/* Hourly strip — upcoming 3-hour slots for today */}
              <HourlyForecast forecastList={todayForecast} />

              {/* 5-day daily summary */}
              <WeeklyForecast data={weekForecast} />

              {/* Atmospheric metrics grid */}
              <WeatherDetails data={todayWeather} />
            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default App;
