type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: string[];
};

const HOLIDAY_API = "https://date.nager.at/api/v3";

const getYearsHolidays = async (year: string, countryCode: string) => {
  try {
    const res = await fetch(
      `${HOLIDAY_API}/publicholidays/${year}/${countryCode}`
    );
    const holidays = (await res.json()) as Holiday[];

    return holidays;
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
    return [];
  }
};

const getNextHolidays = async (countryCode: string) => {
  try {
    const res = await fetch(`${HOLIDAY_API}/NextPublicHolidays/${countryCode}`);
    const holidays = (await res.json()) as Holiday[];
    return holidays;
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
    return [];
  }
};

const printHolidays = (holidays: Holiday[]) => {
  holidays.forEach((holiday) => {
    console.log(`${holiday.date} ${holiday.name} ${holiday.localName}`);
  });
};

const printAllYearsHolidays = async (year: string, countryCode: string) => {
  const holidays = await getYearsHolidays(year, countryCode);
  printHolidays(holidays);
};

const printYearsNextHolidays = async (countryCode: string) => {
  try {
    const nextHoliday = await getNextHolidays(countryCode);

    printHolidays(nextHoliday);
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
  }
};

const isValidateCountryCode = async (countryCode: string) => {
  const res = await fetch(HOLIDAY_API + `/CountryInfo/${countryCode}`);

  if (res.status === 404) {
    return false;
  }

  return true;
};

const main = async () => {
  const [countryCode, year] = process.argv.slice(2);

  if (!countryCode) {
    console.log("국가코드를 입력해주세요.");
    return;
  }

  if (countryCode.length !== 2) {
    console.log("국가코드는 2자리로 입력해주세요.");
    return;
  }

  if (!year) {
    console.log("연도를 입력해주세요.");
    return;
  }

  if (!(await isValidateCountryCode(countryCode))) {
    return console.log("wrong country code");
  }

  if (year === "next") {
    printYearsNextHolidays(countryCode);
  } else {
    printAllYearsHolidays(year, countryCode);
  }
};

main();
