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

async function fetchingData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
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
  const countries = await getAvailableCountries()
  return countries.some(country => country.countryCode.toLowerCase() === countryCode.toLowerCase());
}

async function getAvailableCountries() {
  return await fetchingData(`${availableCountriesUrl}`)
}

async function getHolidayByYear(countryCode, yearOrNext) {
  return await fetchingData(`${holidayApiUrlByYear}/${yearOrNext}/${countryCode}`)
}

async function getUpcomingHoliday(countryCode) {
  return await fetchingData(`${upcomingHolidayApiUrl}/${countryCode}`)
}

function printHolidayData(holidayData) {
  holidayData.forEach(data => {
    console.log(`${data.date} ${data.name} ${data.localName}`);
  });
}

main();
