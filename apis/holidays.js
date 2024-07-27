import { ERROR } from '../contant/error.js';
import { BASE_URL } from '../contant/url.js';

const getHolidays = async ({ countryCode, year }) => {
  const response = await fetch(
    `${BASE_URL}/PublicHolidays/${year}/${countryCode}`
  );

  if (response.status === 400) {
    throw new Error(ERROR.INVALID_REQUEST);
  }

  if (response.status === 404) {
    throw new Error(ERROR.INVALID_COUNTRY_CODE);
  }

  return response.json();
};

const getNextHolidays = async ({ countryCode }) => {
  const response = await fetch(`${BASE_URL}/NextPublicHolidays/${countryCode}`);

  if (response.status === 400) {
    throw new Error(ERROR.INVALID_REQUEST);
  }

  return response.json();
};

export { getHolidays, getNextHolidays };
