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

const HOLIDAY_API = "https://date.nager.at/api/v3/publicholidays";

const getYearsHoliday = async (year: string | number, country: string) => {
  try {
    const res = await fetch(HOLIDAY_API + `/${year}/${country}`);
    const holidays = (await res.json()) as Holiday[];

    if (!res.ok) {
      console.log("입력형식은 국가코드 2자리, 연도 4자리입니다.");

      return [];
    }

    return holidays;
  } catch (error) {
    console.error(error);
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
  const year = new Date().getFullYear();
  const today = new Date();

  const holidays = await getYearsHoliday(year, country);

  const nextHoliday = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate > today;
  });

  printHolidays(nextHoliday);
};

if (year === "next") {
  printYearsNextHoliday(country);
} else {
  printAllYearsHoliday(year, country);
}
