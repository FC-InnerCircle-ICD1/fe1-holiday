import { API_HOST } from "./constants.js";

export const isCountryCodeInvalid = async (countryCode) => {
  const result = await fetch(`${API_HOST}/api/v3/CountryInfo/${countryCode}`);
  return result.status === 404;
};

export const fetchYearHolidays = async (countryCode, year) => {
  const result = await fetch(
    `${API_HOST}/api/v3/PublicHolidays/${year}/${countryCode}`
  );

  if (result.status === 400) {
    console.error("연도가 범위를 벗어났습니다.");
    process.exit(1);
  }

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
