const baseUrl = 'https://date.nager.at/api/v3/';
const publicHolidaysUrl = `${baseUrl}PublicHolidays`;
const nextPublicHolidaysUrl = `${baseUrl}NextPublicHolidays`;
const availableCountriesUrl = `${baseUrl}AvailableCountries`;

async function getHoliday() {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.error('필요인수: 국가코드 연도_또는_next');
        return;
    }

    const [countryCode, yearOrNext] = args;

    if (!await isValidCountryCode(countryCode)) {
        console.error('Wrong country code');
        return;
    }

    let url;
    if (yearOrNext.toLowerCase() === 'next') {
        url = `${nextPublicHolidaysUrl}/${countryCode}`;
    } else {
        url = `${publicHolidaysUrl}/${yearOrNext}/${countryCode}`;
    }

    try {
        const holidayData = await fetchHolidayData(url);
        if (holidayData) {
            holidayData.forEach(data => {
                console.log(`${data.date} ${data.name} ${data.localName}`);
            });
        }
    } catch (error) {
        console.error('Error data:', error);
    }
}
async function isValidCountryCode(countryCode) {
    try {
        const response = await fetch(availableCountriesUrl);
        if (!response.ok) {
            console.error(`api fetch 오류 상태 코드: ${response.status}`)
            return false;
        }
        const countries = await response.json();
        return countries.find(function(country) {
            return country.countryCode.toLowerCase() === countryCode.toLowerCase();
        });
    } catch (error) {
        console.error(error.message)
        return false;
    }
}
async function fetchHolidayData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`api fetch 오류 상태 코드: ${response.status}`)
            return false;
        }
        return await response.json();
    } catch (error) {
        console.error('Error data:', error);
    }
}

getHoliday();
