const BASE_URL = 'https://date.nager.at/api/v3/'

const args = process.argv.slice(2);

const countryCode = args[0];
const year = args[1];

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(response.status);
  }

  const text = await response.text();
  return JSON.parse(text);
}

const getCountryInfo = async (countryCode) => {
  const response = await fetch(`${BASE_URL}CountryInfo/${countryCode}`);
  if (response.status === 404) {
      console.error('Wrong country code');
  }
  return await handleResponse(response);
}

const getHolidays = async (year, countryCode) => {
  const response = await fetch(`${BASE_URL}PublicHolidays/${year}/${countryCode}`);
  return await handleResponse(response);
}

const getNextHolidays = async (countryCode) => {
  const response = await fetch(`${BASE_URL}NextPublicHolidays/${countryCode}`);
  return await handleResponse(response);
}

const main = async () => {
  await getCountryInfo(countryCode);

  const holidayList = year === 'next'
    ? await getNextHolidays(countryCode)
    : await getHolidays(year, countryCode);

  console.log('Holiday List:', holidayList);
}

main();
