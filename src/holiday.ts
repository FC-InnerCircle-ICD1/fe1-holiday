import { Holiday } from "./types/holiday";

export const HOLIDAY_API = "https://date.nager.at/api/v3";

export const fetchHolidays = async <T>(
  url: string,
  fetchCallBack: (url: string) => Promise<Response>
) => {
  try {
    const res = await fetchCallBack(url);

    if (res.status === 404) {
      console.log("국가 코드를 확인해주세요.");
      return [];
    }

    if (res.status === 400) {
      console.log("잘못된 요청입니다.");
      return [];
    }

    return res.json() as Promise<T[]>;
  } catch (e) {
    console.log("에러 발생");
    console.error(e);
    return [];
  }
};

export const isValidateCountryCode = async (
  url: string,
  fetchCallBack: (url: string) => Promise<Response>
) => {
  const res = await fetchCallBack(url);

  if (res.status === 404) {
    return false;
  }

  return true;
};

export const isValidateArguments = (countryCode: string, year: string) => {
  if (!countryCode) {
    return false;
  }

  if (countryCode.length !== 2) {
    return false;
  }

  if (!year) {
    return false;
  }

  return true;
};

export const printHolidays = (holidays: Holiday[]) => {
  holidays.forEach((holiday) => {
    console.log(`${holiday.date} ${holiday.name} ${holiday.localName}`);
  });
};
