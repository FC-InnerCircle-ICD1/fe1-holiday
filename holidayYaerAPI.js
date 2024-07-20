async function getPublicHolidays(year, countryCode) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

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

        const jsonData = await response.json();
        const fixJsonData = jsonData.map((item) => ({
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
    getPublicHolidays
};