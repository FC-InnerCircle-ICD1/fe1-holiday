const baseUrl = 'https://date.nager.at/api/v3/';
const publicHolidaysUrl = `${baseUrl}PublicHolidays`;
const nextPublicHolidaysUrl = `${baseUrl}NextPublicHolidays`;

async function getHoliday() {
    const args = process.argv.slice(2);

    const countryCode = args[0];
    const yearOrNext = args[1];

    let url;
    if (yearOrNext.toLowerCase() === 'next') {
        url = `${nextPublicHolidaysUrl}/${countryCode}`;
    } else {
        url = `${publicHolidaysUrl}/${yearOrNext}/${countryCode}`;
    }

    try {
        const holidayData = await fetchHolidayData(url);
        holidayData.forEach(data => {
            console.log(`${data.date} ${data.name} ${data.localName}`);
        });
    } catch (error) {
        console.error('Error data:', error);
    }
}

async function fetchHolidayData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('error');
        }
        return await response.json();
    } catch (error) {
        console.error('Error data:', error);
    }
}

getHoliday();
