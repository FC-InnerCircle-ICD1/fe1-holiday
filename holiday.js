const holidayApiUrlBase = 'https://date.nager.at/api/v3/';
const availableCountriesUrl = holidayApiUrlBase + 'AvailableCountries'
const holidayApiUrlByYear = holidayApiUrlBase + 'publicholidays';
const upcomingHolidayApiUrl = holidayApiUrlBase + 'NextPublicHolidays';

async function main() {
  const args = await validateArgs();
  if (!args) return;

  const { countryCode, yearOrNext } = args;
  let holidayData;

  if (yearOrNext.toLowerCase() === 'next') {
    holidayData = await getUpcomingHoliday(countryCode);
  } else {
    holidayData = await getHolidayByYear(countryCode, yearOrNext);
  }

  if (holidayData) {
    printHolidayData(holidayData);
  }
}

async function validateArgs() {
  const args = process.argv.slice(2);
  const countryCode = args[0];
  const yearOrNext = args[1];

  if (args.length !== 2) {
    console.error('입력된 인수가 충분하지 않습니다.');
    return null;
  }

  if (!await isAvailableCountry(countryCode)) {
    console.error('지원하지 않는 국가코드입니다.')
    return null;
  }

  return { countryCode, yearOrNext };
}

async function isAvailableCountry(countryCode) {
  try {
    const response = await fetch(`${availableCountriesUrl}`);
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const countries = await response.json();
    const isAvailableCountry = countries.some(country => country.countryCode.toLowerCase() === countryCode.toLowerCase());
    return isAvailableCountry
  } catch (error) {
    console.error('Error fetching holiday data:', error);
  }
}

async function getHolidayByYear(countryCode, yearOrNext) {
  try {
    const response = await fetch(`${holidayApiUrlByYear}/${yearOrNext}/${countryCode}`);
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching holiday data:', error);
  }
}

async function getUpcomingHoliday(countryCode) {
  try {
    const response = await fetch(`${upcomingHolidayApiUrl}/${countryCode}`);
    if (!response.ok) {
      throw new Error('HTTP error');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching holiday data:', error);
  }
}

function printHolidayData(holidayData) {
  holidayData.forEach(data => {
    console.log(`${data.date} ${data.name} ${data.localName}`);
  });
}

main();
