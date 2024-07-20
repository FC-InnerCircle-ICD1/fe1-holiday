async function getPublicHolidays(year, countryCode) {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });



        const jsonData = await response.json();
        if (!response.ok) {

            const errorKeys = Object.keys(jsonData.errors)

            let errorMessage = ''
            errorKeys.map(key => jsonData.errors[key].map((item) => errorMessage += item + "\n"))
            throw new Error(`${errorMessage}`)

        } else {
            const fixJsonData = jsonData.map((item) => ({
                date: item.date,
                localName: item.localName,
                eName: item.name
            }));

            return fixJsonData;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPublicHolidays
};