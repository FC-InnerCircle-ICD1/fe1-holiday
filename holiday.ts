// process.argv 배열을 통해 명령줄 인수를 가져옵니다.
const args = process.argv.slice(2); // 첫 두 개의 요소를 제외한 나머지 요소들을 가져옵니다.

// 명령줄 인수들을 변수에 할당합니다.
const country = args[0];
const year = args[1];

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

const getYearsHoliday = async (year: string | number, country: string) => {
  const res = await fetch(HOLIDAY_API + `/publicholidays/${year}/${country}`);

  if (res.status === 404 || res.status === 400) {
    console.log("입력형식은 국가코드 2자리, 연도 4자리입니다.");
    return [];
  }

  const holidays = (await res.json()) as Holiday[];
  return holidays;
};

const getNextHoliday = async (country: string) => {
  const res = await fetch(HOLIDAY_API + `/NextPublicHolidays/${country}`);

  console.log(res.status);

  if (res.status === 204) {
    console.log("입력형식은 국가코드 2자리입니다.");
    return [];
  }

  const holidays = (await res.json()) as Holiday[];
  return holidays;
};

const printHolidays = (holidays: Holiday[]) => {
  holidays.forEach((holiday) => {
    console.log(`${holiday.date} ${holiday.name} ${holiday.localName}`);
  });
};

const printAllYearsHoliday = async (year: string, country: string) => {
  try {
    const holidays = await getYearsHoliday(year, country);
    printHolidays(holidays);
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
  }
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

if (year === "next") {
  printYearsNextHoliday(country);
} else {
  printAllYearsHoliday(year, country);
}
