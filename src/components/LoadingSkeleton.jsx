/**
 * @file components/LoadingSkeleton.jsx
 * @description Skeleton loading state displayed while weather data is being fetched.
 *
 * Renders glass-styled placeholder cards whose shapes mirror the final layout
 * (hero, hourly strip, weekly list, details grid). Each block uses the
 * `shimmer-bg` utility (defined in index.css) for a sweeping highlight effect.
 */

/** Single shimmer block — rounded rectangle with configurable size. */
const Block = ({ className = "" }) => (
  <div className={`shimmer-bg rounded-xl ${className}`} />
);

/**
 * LoadingSkeleton — placeholder layout matching the WeatherData cards.
 */
const LoadingSkeleton = () => (
  <div className="flex flex-col gap-4 animate-fade-in-up">
    {/* Hero card skeleton */}
    <div className="glass p-6 space-y-4">
      <Block className="h-4 w-1/4" />
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Block className="h-16 w-36" />
          <Block className="h-3 w-24" />
        </div>
        <Block className="w-20 h-20 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Block className="h-3 w-20" />
        <Block className="h-3 w-16" />
        <Block className="h-3 w-16" />
      </div>
    </div>

    {/* Hourly strip skeleton */}
    <div className="glass p-5 space-y-4">
      <Block className="h-3 w-28" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Block key={i} className="h-24 w-16 flex-shrink-0" />
        ))}
      </div>
    </div>

    {/* Weekly list skeleton */}
    <div className="glass p-5 space-y-4">
      <Block className="h-3 w-28" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Block key={i} className="h-9 w-full" />
        ))}
      </div>
    </div>

    {/* Details grid skeleton */}
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass p-4">
          <Block className="h-3 w-16 mb-2" />
          <Block className="h-6 w-20" />
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
