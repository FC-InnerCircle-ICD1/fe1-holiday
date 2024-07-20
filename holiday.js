// 명령줄 인수 받기
const [, , countryCode, yearOrNext] = process.argv;

const BASE_URL = 'https://date.nager.at/api/v3';

// argument 검증 체크
const validateArgs = () => {
  if (!countryCode) {
    console.error(
      'Error: Country code is missing.\nUsage: node holiday.js <CountryCode> <Year_or_Next>',
    );
    process.exit(1);
  }

  if (!yearOrNext) {
    console.error(
      "Error: Year or 'next' is missing.\nUsage: node holiday.js <CountryCode> <Year_or_Next>",
    );
    process.exit(1);
  }
};

// 나라 코드
const getAvailableCountries = async () => {
  const url = `${BASE_URL}/AvailableCountries`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching getAvailableCountries: ${response.statusText}`,
      );
    }
    const countries = await response.json();

    const filterCountriesAvailableArr = countries.map(
      (countries) => countries.countryCode,
    );

    return filterCountriesAvailableArr;
  } catch (error) {
    throw new Error(`Error fetching getAvailableCountries: ${error}`);
  }
};

const checkToAvailable = async () => {
  const countriesCode = await getAvailableCountries();

  if (!countriesCode.includes(countryCode)) {
    console.error(
      `허용되지 않는 나라코드입니다. 나라코드를 다시 작성해주세요.`,
    );
    throw new Error(
      `허용되지 않는 나라코드입니다. 나라코드를 다시 작성해주세요.`,
    );
  }
};

const getNextTodayHolidays = async (countryCode) => {
  const url = `${BASE_URL}/NextPublicHolidays/${countryCode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching next data:', error);
  }
};

const getHolidays = async (countryCode, year) => {
  const url = `${BASE_URL}/publicholidays/${year}/${countryCode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching holidays: ${response.statusText}`);
    }
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    throw new Error(`Error fetching holidays: ${error}`);
  }
};

const displayHolidays = (holidays) => {
  holidays.forEach((holiday) => {
    console.log(`${holiday.date} ${holiday.name} ${holiday.localName}`);
  });
};

const main = async () => {
  await checkToAvailable();
  validateArgs();

  if (yearOrNext.toLowerCase() === 'next') {
    const holidays = await getNextTodayHolidays(countryCode);
    displayHolidays(holidays);
  } else {
    const year = parseInt(yearOrNext, 10);
    if (isNaN(year)) {
      console.log("Year should be a number or 'next'");
      process.exit(1);
    }
    const holidays = await getHolidays(countryCode, year);
    displayHolidays(holidays);
  }
};

main();
