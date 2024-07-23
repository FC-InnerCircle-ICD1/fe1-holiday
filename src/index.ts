import {
  isValidateCountryCode,
  HOLIDAY_API,
  fetchHolidays,
  printHolidays,
  isValidateArguments,
} from "./holiday";
import { Holiday } from "./types/holiday";

const main = async () => {
  const [countryCode, year] = process.argv.slice(2);

  if (!isValidateArguments(countryCode, year)) {
    console.log("입력값을 확인해주세요.");
    console.log(
      "올바른 형식은 국가코드 2자리, 조회년도 4자리 또는 next입니다."
    );
    console.log("예) pnpm start KR 2024");
    console.log("예) pnpm start KR next");
    return;
  }

  if (
    !(await isValidateCountryCode(
      `${HOLIDAY_API}/CountryInfo/${countryCode}`,
      fetch
    ))
  ) {
    return console.log("wrong country code");
  }

  if (year === "next") {
    const url = `${HOLIDAY_API}/NextPublicHolidays/${countryCode}`;
    const nextHoliday = await fetchHolidays<Holiday>(url, fetch);

    printHolidays(nextHoliday);
  } else {
    const url = `${HOLIDAY_API}/publicholidays/${year}/${countryCode}`;
    const holidays = await fetchHolidays<Holiday>(url, fetch);

    printHolidays(holidays);
  }
};

main();
