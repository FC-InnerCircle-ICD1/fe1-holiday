const API_URL = 'https://date.nager.at/api/v3';

const args = process.argv.slice(2);
const [countryCode, yearOrNext] = args;

if (!countryCode || !yearOrNext) {
    console.error('Usage: node holiday.js <country_code> <year_orNext>');
    process.exit(1);
}

if (!/^[A-Z]{2}$/.test(countryCode)) {
    console.error('Wrong country code');
    process.exit(1);
}

const getSupportedCountryCodes = async () => {
    try {
        const response = await fetch(`${API_URL}/AvailableCountries`);
        if (response.ok) {
            const countries = await response.json();
            return countries.map(country => country.countryCode);
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

const getHolidaysForYear = async (countryCode, year) => {
    try {
        const url = `${API_URL}/PublicHolidays/${year}/${countryCode}`;
        console.log(`Request URL: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

const getNextPublicHolidays = async (countryCode) => {
  try {
      const url = `${API_URL}/NextPublicHolidays/${countryCode}`;
      console.log(`Request URL: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
          return await response.json();
      } else {
          throw new Error(`Error: ${response.status}`);
      }
  } catch (error) {
      throw new Error(`Error: ${error.message}`);
  }
};

const printHolidays = (holidays) => {
    holidays.forEach(holiday => {
        console.log(`${holiday.date} ${holiday.localName} ${holiday.name}`);
    });
};

const main = async () => {
    const supportedCountryCodes = await getSupportedCountryCodes();
        
    if (!supportedCountryCodes.includes(countryCode)) {
        console.error('Wrong country code');
        process.exit(1);
    }

    if (yearOrNext.toLowerCase() === 'next') {
        const upcomingHolidays = await getNextPublicHolidays(countryCode);
        printHolidays(upcomingHolidays);
    } else if (/^\d{4}$/.test(yearOrNext)) {
        const holidays = await getHolidaysForYear(countryCode, yearOrNext);
        printHolidays(holidays);
    } else {
        console.error('Usage: node holiday.js <country_code> <year_or_next>');
        process.exit(1);
    }

};

main();