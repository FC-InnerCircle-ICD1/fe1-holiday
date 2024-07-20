async function getCountiresList() {
    const url = 'https://date.nager.at/api/v3/AvailableCountries';

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const jsonData = await response.json();
        const fixJsonData = jsonData.map((item) => item.countryCode);

        return fixJsonData;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCountiresList
};