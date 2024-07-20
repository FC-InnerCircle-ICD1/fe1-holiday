import { getSupportedCountryCodes, getHolidaysForYear, getNextPublicHolidays } from './api.js';
import { printHolidays } from './utils.js';

const args = process.argv.slice(2);
const [countryCode, yearOrNext] = args;

if (!countryCode || !yearOrNext) {
    console.error('Usage: node holiday.js <country_code> <year_or_next>');
    process.exit(1);
}

if (!/^[A-Z]{2}$/.test(countryCode)) {
    console.error('Wrong country code');
    process.exit(1);
}

const main = async (countryCode, yearOrNext) => {
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

main(countryCode, yearOrNext);