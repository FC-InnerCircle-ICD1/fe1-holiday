import { isArgumentsValid } from "./validation.js";
import { isCountryCodeInvalid, fetchHolidays } from "./api.js";

const main = async () => {
  if (!isArgumentsValid(process.argv)) {
    console.error(
      '"node holiday.js 국가코드 연도_또는_next" 형식으로 입력해주세요.'
    );
    return;
  }

  const [, , countryCode, year] = process.argv;

  if (await isCountryCodeInvalid(countryCode)) {
    console.error("Wrong country code");
    return;
  }

  const holidays = await fetchHolidays(countryCode, year);
  holidays.forEach(({ date, name, localName }) => {
    console.log(date, name, localName);
  });
};

main();
