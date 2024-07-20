
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
            console.error('Year not found');
            return;
        }
        data.forEach(holiday => {
            if(nextYn) {
                const holidayDate = new Date(holiday.date);
                if (holidayDate > today) {
                    console.log(holiday.name);
                }
            } else 
                console.log(holiday.name);
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
    var d = new Date();
    year = d.getFullYear();
    nextYn = true;
}

getPublicHolidays(countryCode, year);
    
    
