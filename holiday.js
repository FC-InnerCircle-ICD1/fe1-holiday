import { getHolidays } from "./api.js";

async function Holiday() {
  const args = process.argv.slice(2);
  const countryCode = args[0];
  const Year = args[1];

  if (args.length < 2) {
    console.error(
      '"node holiday.js 국가코드 연도_또는_next" 형식으로 입력해주세요.'
    );
    process.exit(1);
  }

  if (!/^[A-Z]{2}$/.test(countryCode)) {
    console.error("Wrong country code");
    process.exit(1);
  }

  try {
    const holidays = await getHolidays(countryCode, Year);
    holidays.forEach(({ date, name, localName }) => {
      console.log(date, name, localName);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

Holiday();
