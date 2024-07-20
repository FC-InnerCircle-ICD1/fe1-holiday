async function getNextHolidays(countryCode) {
    const url = `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status code ${response.status}`);
        }
        const currentYear = new Date().getFullYear();

        const jsonData = await response.json();
        const fixJsonData = jsonData
            .filter(item => {
                return parseInt(item.date.slice(0, 4)) === currentYear
            })
            .map(item => ({
                date: item.date,
                localName: item.localName,
                eName: item.name
            }));

        return fixJsonData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getNextHolidays
};