/**
 * @file components/WelcomeScreen.jsx
 * @description Idle-state placeholder shown before the user searches for a city.
 * Fades in with the page and provides a visual cue to use the search bar above.
 */

import { WiDaySunny } from "react-icons/wi";

/**
 * WelcomeScreen — animated idle state with a prompt to search.
 */
const WelcomeScreen = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-5 text-white animate-fade-in-up">
    <WiDaySunny className="text-9xl opacity-40" />
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-light opacity-80">Welcome</h2>
      <p className="text-sm font-light text-white/50 max-w-xs leading-relaxed">
        Search for any city above to see live weather conditions and a 5-day forecast.
      </p>
    </div>
  </div>
);

export default WelcomeScreen;
