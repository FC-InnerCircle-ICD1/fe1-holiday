const BASE_URL = 'https://date.nager.at/api/v3';

const getHolidays = async ({ countryCode, year }) => {
  const response = await fetch(
    `${BASE_URL}/PublicHolidays/${year}/${countryCode}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const getNextHolidays = async ({ countryCode }) => {
  const response = await fetch(`${BASE_URL}/NextPublicHolidays/${countryCode}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export { getHolidays, getNextHolidays };
