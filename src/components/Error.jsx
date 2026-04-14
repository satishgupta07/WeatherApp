/**
 * @file components/Error.jsx
 * @description Glass-styled error message panel shown when the weather API
 * call fails. Renders a soft red warning icon above the message text.
 */

import { FaExclamationCircle } from "react-icons/fa";

/**
 * ErrorMessage — contextual error banner.
 *
 * @param {Object}  props
 * @param {string} [props.message] - Error text; defaults to a generic fallback.
 */
const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}) => (
  <div className="glass p-6 text-white flex flex-col items-center gap-3 animate-fade-in-up">
    <FaExclamationCircle className="text-3xl text-red-400 opacity-80" />
    <p className="text-sm text-white/65 text-center leading-relaxed max-w-xs">
      {message}
    </p>
  </div>
);

export default ErrorMessage;
