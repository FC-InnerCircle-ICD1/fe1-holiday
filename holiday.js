
const { getPublicHolidays } = require('./holidayYaerApi');
const { getCountiresList } = require('./holidayCountriesApi');
const { getNextHolidays } = require('./holidayNextApi');
// const { getPublicHolidays } = require('./holidayNextApi');






async function fetchHolidays() {


    try {

        const args = process.argv.slice(2);
        const countryCode = args[0];
        const option = args[1];
        if (args.length < 2) {
            throw new Error("파라미터를 2개 입력해주세요.")
        }

        const countryExistCode = await getCountiresList();

        if (!countryExistCode.includes(countryCode.toUpperCase())) {
            throw new Error("국가코드가 존재하지 않습니다. 확인해주세요.")
        }

        let data
        if (option.toUpperCase() === 'NEXT') {
            data = await getNextHolidays(countryCode);
            data.map((item) => {
                console.log(`${item.date} ${item.eName} ${item.localName}`)
            })
        } else if (!isNaN(option)) {
            data = await getPublicHolidays(option, countryCode);
            if (typeof data === 'string') {
                console.log(data)
            } else {
                data.map((item) => {
                    console.log(`${item.date} ${item.eName} ${item.localName}`)
                })
            }

        } else {
            throw new Error("두번째 파라미터에 존재하지 않는 명령어가 입력되었습니다.")
        }
        // console.log('Public Holidays:', data);
    } catch (error) {
        console.error(error);
    }
}

fetchHolidays();