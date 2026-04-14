/**
 * @file components/Search.jsx
 * @description Glassmorphic city search dropdown powered by react-select-async-paginate.
 *
 * The react-select `styles` prop overrides every part of the default theme so
 * the control, menu, and options all match the dark glass aesthetic of the app.
 * A 600 ms debounce prevents a request on every keystroke.
 *
 * Errors from `fetchCities` are caught here and returned as an empty options
 * list so the dropdown degrades gracefully without crashing.
 */

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../api";

/**
 * react-select style overrides — all dark glass, no Tailwind classes
 * (react-select injects its own CSS-in-JS so Tailwind can't reach it).
 */
const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: isFocused
      ? "1px solid rgba(255, 255, 255, 0.35)"
      : "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "1rem",
    boxShadow: "none",
    padding: "2px 4px",
    cursor: "text",
    transition: "border-color 200ms",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.25)",
    },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 8px" }),
  input: (base) => ({ ...base, color: "white", margin: 0 }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.38)",
    fontSize: "0.9rem",
  }),
  singleValue: (base) => ({ ...base, color: "white" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.35)",
    "&:hover": { color: "rgba(255, 255, 255, 0.6)" },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.35)",
    "&:hover": { color: "rgba(255, 255, 255, 0.6)" },
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(10, 15, 30, 0.92)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    overflow: "hidden",
    marginTop: "8px",
  }),
  menuList: (base) => ({ ...base, padding: "4px" }),
  option: (base, { isFocused }) => ({
    ...base,
    background: isFocused ? "rgba(255, 255, 255, 0.1)" : "transparent",
    color: "white",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "10px 12px",
    transition: "background 150ms",
  }),
  loadingMessage: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.45)",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.45)",
  }),
};

/**
 * Search — async city lookup dropdown with glass styling.
 *
 * @param {Object}   props
 * @param {Function} props.onSearchChange - Invoked with `{ value: "lat lon", label: "City, CC" }`
 *   when the user selects a result.
 */
const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  /**
   * Load city options for the current input string.
   * Errors are swallowed so the dropdown shows "No options" rather than crashing.
   *
   * @param {string} inputValue
   * @returns {Promise<{options: Array}>}
   */
  const loadOptions = async (inputValue) => {
    try {
      const data = await fetchCities(inputValue);
      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch {
      return { options: [] };
    }
  };

  const onChangeHandler = (selected) => {
    setSearchValue(selected);
    onSearchChange(selected);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city..."
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
      styles={selectStyles}
    />
  );
};

export default Search;
