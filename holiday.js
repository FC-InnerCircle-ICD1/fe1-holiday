const BASE_URL = 'https://date.nager.at/api/v3';

const inputs = process.argv.slice(2);

const fetchHolidays = async (country, year) => {
  const response = await fetch(`${BASE_URL}/PublicHolidays/${year}/${country}`);
  if (response.status === 404) {
    throw new Error('Wrong country code');
  } else if (response.status === 500) {
    throw new Error('Server error');
  } else if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchNextHolidays = async (country) => {
  const response = await fetch(`${BASE_URL}/NextPublicHolidays/${country}`);
  return response.json();
};

const printHolidays = (holidays) => {
  holidays.forEach((holiday) => {
    console.log(holiday.date, holiday.localName, holiday.name);
  });
};

const filterFutureHolidays = (holidays, fromDate) => {
  return holidays.filter((holiday) => new Date(holiday.date) >= fromDate);
};

const getHolidays = async (country, yearOrNext) => {
  return yearOrNext === 'next'
    ? await fetchNextHolidays(country)
    : await fetchHolidays(country, yearOrNext);
};

// 메인 함수
const main = async (country, yearOrNext) => {
  const holidays = await getHolidays(country, yearOrNext);
  printHolidays(holidays);
};

if (inputs.length != 2) {
  console.log(
    '충분한 인수가 전달되지 않았습니다. 첫번째 인자 국가코드, 두번째 인자 연도 / next 을 입력해주세요'
  );
} else {
  main(...inputs);
}
