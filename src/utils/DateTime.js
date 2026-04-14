/**
 * @file utils/DateTime.js
 * @description Date and time helpers used across the WeatherApp.
 *
 * IMPORTANT: `new Date()` is called inside each function, not at module
 * load time. A module-level Date would be frozen to the instant the module
 * was first imported, causing stale timestamps for any search performed more
 * than a few seconds after the page loaded.
 */

import { DAYS } from "./DateConstants";

/**
 * Build an ordered array of weekday names starting from today.
 *
 * Rotates the Monday-first DAYS array so index 0 is the current day.
 * JavaScript's getDay() returns 0 (Sunday)–6 (Saturday), while DAYS is
 * Monday-first (index 0 = Monday), so the rotation handles the offset.
 *
 * @returns {string[]} 7 weekday names, starting with today.
 */
export function getWeekDays() {
  const dayInAWeek = new Date().getDay();
  const days = DAYS.slice(dayInAWeek, DAYS.length).concat(
    DAYS.slice(0, dayInAWeek)
  );
  return days;
}

/**
 * Return the current local date-time as "YYYY-MM-DD HH:MM:SS".
 *
 * Matches the format of the `dt_txt` field returned by the OpenWeatherMap
 * /forecast endpoint, enabling direct prefix-matching when filtering today's
 * forecast intervals.
 *
 * @returns {string} e.g. "2024-06-15 14:00:00"
 */
export function transformDateFormat() {
  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  return `${year}-${month}-${day} ${time}`;
}
