
async function getPublicHolidays(countryCode, year) {
    if (!countryCode || !year) {
        console.error('Country code and year are required.');
        return;
    }
    else if(countryCode.length !== 2){
        console.error('Wrong country code');
        return;
    }
        

fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
    .then(response => response.json())
    .then(data => {
        if(data.status === 404){
            console.error('Country code not found');
            return;
        } else if (data.status === 400) {
            console.error('Validation failure');
            return;
        }
        data.forEach(holiday => {
            if(nextYn) {
                const holidayDate = new Date(holiday.date);
                if (holidayDate > today) {
                    console.log(holiday.date ,' ',holiday.name ,' ',holiday.localName);
                }
            } else 
                console.log(holiday.date ,' ',holiday.name ,' ',holiday.localName);
        });
    })
    .catch(error => {
        console.error('Error retrieving public holidays:', error.message);
    });


}

const countryCode = process.argv[2];
const today = new Date();
let year = process.argv[3];
let nextYn = false;


if (year === "next") {
    year = new Date().getFullYear();
    nextYn = true;
}

getPublicHolidays(countryCode, year);
    
    
