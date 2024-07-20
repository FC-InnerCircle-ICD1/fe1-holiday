const BASE_URL = 'https://date.nager.at/api/v3/';

const inputs = process.argv.slice(2);

const fetchHolidays = async (country, year) => {
  const response = await fetch(`${BASE_URL}PublicHolidays/${year}/${country}`);
  return response.json();
};

// 메인 함수
const main = async (country, year) => {
  try {
    const holidays = await fetchHolidays(country, year);
    console.log(holidays);
  } catch (error) {
    console.erxror('Error fetching holidays:', error);
  }
};

if (inputs.length != 2) {
  console.log(
    '충분한 인수가 전달되지 않았습니다. 첫번째 인자는 국가코드, 두번째는 년도나 next값을 전달해주세요'
  );
} else {
  main(...inputs);
}
