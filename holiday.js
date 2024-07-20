const API_HOST = "https://date.nager.at";

const EXPECTED_ARGV_LENGTH = 4;

const isInteger = (str) => {
  if (str.length === 0) return false;

  const num = Number(str);
  return Number.isInteger(num) && num.toString() === str;
};

const validateCountryCode = async (countryCode) => {
  const result = await fetch(`${API_HOST}/api/v3/CountryInfo/${countryCode}`);
  return result.ok;
};

const fetchYearHolidays = async (countryCode, year) => {
  const result = await fetch(
    `${API_HOST}/api/v3/PublicHolidays/${year}/${countryCode}`
  );
  return await result.json();
};

const fetchNextHolidays = async (countryCode) => {
  const result = await fetch(
    `${API_HOST}/api/v3/NextPublicHolidays/${countryCode}`
  );
  return await result.json();
};

const fetchHolidays = async (countryCode, year) => {
  return year === "next"
    ? await fetchNextHolidays(countryCode)
    : await fetchYearHolidays(countryCode, year);
};

const main = async () => {
  if (
    process.argv.length !== EXPECTED_ARGV_LENGTH ||
    !(isInteger(process.argv[3]) || process.argv[3] === "next")
  ) {
    console.error(
      '"node holiday.js 국가코드 연도_또는_next" 형식으로 입력해주세요.'
    );
    return;
  }

  const [, , countryCode, year] = process.argv;

  if (!(await validateCountryCode(countryCode))) {
    console.error("Wrong country code");
    return;
  }

  const holidays = await fetchHolidays(countryCode, year);
  holidays.forEach(({ date, name, localName }) => {
    console.log(date, name, localName);
  });
};

main();
