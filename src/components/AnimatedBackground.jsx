/**
 * @file components/AnimatedBackground.jsx
 * @description Full-screen animated gradient background with three floating
 * colour blobs that react to the current weather condition.
 *
 * The gradient and blob colours are driven by `weatherThemes.getTheme()` which
 * maps OWM condition names (e.g. "Clear", "Rain") to hex colour sets.
 * All colours are applied as inline styles to avoid Tailwind purging
 * dynamically constructed class names at build time.
 *
 * The component is `position: fixed` and rendered behind everything via
 * `-z-10`, so it never affects the document flow.
 */

import { getTheme } from "../utils/weatherThemes";

/**
 * AnimatedBackground — weather-reactive full-screen gradient with blobs.
 *
 * @param {Object}          props
 * @param {string|undefined} props.condition - OWM `weather[0].main` value.
 */
const AnimatedBackground = ({ condition }) => {
  const theme = getTheme(condition);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-[1500ms]"
      style={{
        background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
      }}
    >
      {/* Blob 1 — top-left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-40 blur-3xl animate-blob"
        style={{ backgroundColor: theme.blob1 }}
      />
      {/* Blob 2 — mid-right, delayed 2 s */}
      <div
        className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"
        style={{ backgroundColor: theme.blob2 }}
      />
      {/* Blob 3 — bottom-centre, delayed 4 s */}
      <div
        className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"
        style={{ backgroundColor: theme.blob3 }}
      />
    </div>
  );
};

export default AnimatedBackground;
