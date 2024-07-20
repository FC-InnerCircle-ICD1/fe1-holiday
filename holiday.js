const BASE_URL = 'https://date.nager.at/api/v3/PublicHolidays';

const inputs = process.argv.slice(2);

const fetchHolidays = async (country, year) => {
  const response = await fetch(`${BASE_URL}/${year}/${country}`);
  if (response.status === 404) {
    throw new Error('Wrong country code');
  } else if (response.status === 500) {
    throw new Error('Server error');
  } else if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const printHolidays = (holidays) => {
  holidays.forEach((holiday) => {
    console.log(holiday.date, holiday.localName, holiday.name);
  });
};

// 메인 함수
const main = async (country, yearOrNext) => {
  try {
    const today = new Date();
    const thisYear = today.getFullYear();

    let holidays;
    if (yearOrNext === 'next') {
      holidays = await fetchHolidays(country, thisYear);
      holidays = holidays.filter((holiday) => new Date(holiday.date) >= today);
    } else {
      holidays = await fetchHolidays(country, yearOrNext);
    }

    printHolidays(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
  }
};

if (inputs.length != 2) {
  console.log(
    '충분한 인수가 전달되지 않았습니다. 첫번째 인자 국가코드, 두번째 인자 연도 / next 을 입력해주세요'
  );
} else {
  main(...inputs);
}
