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

const getYearsHoliday = async (year: string, country: string) => {
  try {
    const res = await fetch(`${HOLIDAY_API}/publicholidays/${year}/${country}`);
    const holidays = (await res.json()) as Holiday[];

    return holidays;
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
    return [];
  }
};

const getNextHoliday = async (country: string) => {
  try {
    const res = await fetch(`${HOLIDAY_API}/NextPublicHolidays/${country}`);
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

const printAllYearsHoliday = async (year: string, country: string) => {
  const holidays = await getYearsHoliday(year, country);
  printHolidays(holidays);
};

const printYearsNextHoliday = async (country: string) => {
  try {
    const nextHoliday = await getNextHoliday(country);

    printHolidays(nextHoliday);
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
  }
};

const validateCountry = async (country: string) => {
  const res = await fetch(HOLIDAY_API + `/CountryInfo/${country}`);

  if (res.status === 404) {
    console.log("Wrong country code");
    return;
  }
};

const main = async () => {
  // process.argv 배열을 통해 명령줄 인수를 가져옵니다.
  const args = process.argv.slice(2); // 첫 두 개의 요소를 제외한 나머지 요소들을 가져옵니다.

  // 명령줄 인수들을 변수에 할당합니다.
  const [country, year] = args;

  if (!country) {
    console.log("국가코드를 입력해주세요.");
    return;
  }

  if (country.length !== 2) {
    console.log("국가코드는 2자리로 입력해주세요.");
    return;
  }

  if (!year) {
    console.log("연도를 입력해주세요.");
    return;
  }

  await validateCountry(country);

  if (year === "next") {
    printYearsNextHoliday(country);
  } else {
    printAllYearsHoliday(year, country);
  }
};

main();