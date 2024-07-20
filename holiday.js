const https = require('https');

const API_URL = 'https://date.nager.at/api/v3';

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

const getSupportedCountryCodes = () => {
    return new Promise((resolve, reject) => {
        https.get(`${API_URL}/AvailableCountries`, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    const countries = JSON.parse(data);
                    resolve(countries.map(country => country.countryCode));
                } else {
                    reject(`Error: ${res.statusCode}`);
                }
            });
        }).on('error', (err) => {
            reject(`Error: ${err.message}`);
        });
    });
};

const getHolidaysForYear = (countryCode, year) => {
    return new Promise((resolve, reject) => {
        const url = `${API_URL}/PublicHolidays/${year}/${countryCode}`;
        console.log(`Request URL: ${url}`);
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(`Error: ${res.statusCode}`);
                }
            });
        }).on('error', (err) => {
            reject(`Error: ${err.message}`);
        });
    });
};

const filterUpcomingHolidays = (holidays) => {
    const today = new Date();
    return holidays.filter(holiday => new Date(holiday.date) > today);
};

const printHolidays = (holidays) => {
    holidays.forEach(holiday => {
        console.log(`${holiday.date} ${holiday.localName} ${holiday.name}`);
    });
};

const main = async () => {
    try {
        const supportedCountryCodes = await getSupportedCountryCodes();
        
        if (!supportedCountryCodes.includes(countryCode)) {
            console.error('Wrong country code');
            process.exit(1);
        }

        if (yearOrNext.toLowerCase() === 'next') {
            const currentYear = new Date().getFullYear();
            const holidays = await getHolidaysForYear(countryCode, currentYear);
            const upcomingHolidays = filterUpcomingHolidays(holidays);
            printHolidays(upcomingHolidays);
        } else if (/^\d{4}$/.test(yearOrNext)) {
            const holidays = await getHolidaysForYear(countryCode, yearOrNext);
            printHolidays(holidays);
        } else {
            console.error('Usage: node holiday.js <country_code> <year_or_next>');
            process.exit(1);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main();