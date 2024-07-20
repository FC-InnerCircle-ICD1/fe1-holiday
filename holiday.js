const BASE_URL = 'https://date.nager.at/api/v3/';

const [country, year] = process.argv.slice(2);

const fetchHolidays = async (country, year) => {
  const response = await fetch(`${BASE_URL}PublicHolidays/${year}/${country}`);
  return response.json();
};

// 메인 함수
const main = async () => {
  try {
    const holidays = await fetchHolidays(country, year);
    console.log(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
  }
};

main();
