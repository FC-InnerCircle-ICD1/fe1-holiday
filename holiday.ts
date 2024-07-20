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
  const url = `${HOLIDAY_API}/publicholidays/${year}/${countryCode}`;

  return fetchHolidays<Holiday>(url);
};

const getNextHolidays = async (countryCode: string) => {
  const url = `${HOLIDAY_API}/NextPublicHolidays/${countryCode}`;

  return fetchHolidays<Holiday>(url);
};

const fetchHolidays = async <T>(url: string) => {
  try {
    const res = await fetch(url);
    return res.json() as Promise<T[]>;
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

export {
  Holiday,
  getYearsHolidays,
  getNextHolidays,
  printHolidays,
  printAllYearsHolidays,
  printYearsNextHolidays,
  isValidateCountryCode,
};
