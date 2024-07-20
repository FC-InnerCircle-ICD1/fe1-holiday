
async function getPublicHolidays(countryCode, year) {
    if (!countryCode || !year) {
        console.error('Country code and year are required.');
        return;
    }

fetch('https://date.nager.at/api/v3/PublicHolidays/2024/AT')
    .then(response => response.json())
    .then(data => {
        const holidays = data;
        holidays.forEach(holiday => {
            console.log(holiday.name);
        });
    })
    .catch(error => {
        console.error('Error retrieving public holidays:', error.message);
    });


}

    const countryCode = process.argv[2];
    const year = process.argv[3];
    getPublicHolidays(countryCode, year);
    
