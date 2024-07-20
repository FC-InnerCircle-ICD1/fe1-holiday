import { API_HOST } from "./constants.js";

export const validateCountryCode = async (countryCode) => {
  const result = await fetch(`${API_HOST}/api/v3/CountryInfo/${countryCode}`);
  return result.ok;
};

export const fetchYearHolidays = async (countryCode, year) => {
  const result = await fetch(
    `${API_HOST}/api/v3/PublicHolidays/${year}/${countryCode}`
  );
  return await result.json();
};

export const fetchNextHolidays = async (countryCode) => {
  const result = await fetch(
    `${API_HOST}/api/v3/NextPublicHolidays/${countryCode}`
  );
  return await result.json();
};

export const fetchHolidays = async (countryCode, year) => {
  return year === "next"
    ? await fetchNextHolidays(countryCode)
    : await fetchYearHolidays(countryCode, year);
};
