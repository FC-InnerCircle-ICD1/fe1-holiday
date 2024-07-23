import {
  fetchHolidays,
  isValidateArguments,
  isValidateCountryCode,
  printHolidays,
} from "../holiday";
import { assertEquals, TestSuite } from "./TestSuite";

const testSuite = new TestSuite();

const holidayList = [
  {
    date: new Date("2024-01-01").toISOString(),
    localName: "신정",
    name: "New Year's Day",
    countryCode: "KR",
    fixed: false,
    global: false,
    counties: ["KR"],
    launchYear: 1234,
    types: ["National holiday"],
  },
  {
    date: new Date("2024-08-15").toISOString(),
    localName: "광복절",
    name: "Liberation Day",
    countryCode: "KR",
    fixed: false,
    global: false,
    counties: ["KR"],
    launchYear: 1234,
    types: ["National holiday"],
  },
];

const successMockFetch = async (): Promise<Response> => {
  return {
    status: 200,
    json: async () => {
      return holidayList;
    },
  } as Response;
};

const failMockFetch = async (): Promise<Response> => {
  return {
    status: 404,
  } as Response;
};

const errorMockFetch = async (): Promise<Response> => {
  throw new Error("Error");
};

testSuite.addTest(
  "fetchHolidays 함수의 api 요청이 성공하면 휴일 목록을 반환한다.",
  async () => {
    const url = "http://test.com";

    const holidays = await fetchHolidays(url, successMockFetch);

    assertEquals(holidays, holidayList);
  }
);

testSuite.addTest(
  "fetchHolidays 함수의 api 요청이 실패하면 빈 배열을 반환한다.",
  async () => {
    const url = "http://test.com";

    const holidays = await fetchHolidays(url, failMockFetch);

    assertEquals(holidays.length, 0);
  }
);

testSuite.addTest(
  "fetchHolidays 함수의 api 요청이 에러가 발생하면 빈 배열을 반환한다.",
  async () => {
    const url = "http://test.com";

    const holidays = await fetchHolidays(url, errorMockFetch);

    assertEquals(holidays.length, 0);
  }
);

testSuite.addTest(
  "isValidateCountryCode 함수는 국가 코드가 유효하면 true를 반환한다.",
  async () => {
    const url = "http://test.com";

    const result = await isValidateCountryCode(url, successMockFetch);

    assertEquals(result, true);
  }
);

testSuite.addTest(
  "isValidateCountryCode 함수는 국가 코드가 유효하지 않으면 false를 반환한다.",
  async () => {
    const url = "http://test.com";

    const result = await isValidateCountryCode(url, failMockFetch);

    assertEquals(result, false);
  }
);

testSuite.addTest(
  "isValidateArguments 함수는 국가 코드가 없으면 false를 반환한다.",
  () => {
    const result = isValidateArguments("", "2024");

    assertEquals(result, false);
  }
);

testSuite.addTest(
  "isValidateArguments 함수는 국가 코드가 2자리가 아니면 false를 반환한다.",
  () => {
    const result = isValidateArguments("KOR", "2024");

    assertEquals(result, false);
  }
);

testSuite.addTest(
  "isValidateArguments 함수는 연도가 없으면 false를 반환한다.",
  () => {
    const result = isValidateArguments("KR", "");

    assertEquals(result, false);
  }
);

testSuite.addTest(
  "isValidateArguments 함수는 국가 코드와 연도가 유효하면 true를 반환한다.",
  () => {
    const result = isValidateArguments("KR", "2024");

    assertEquals(result, true);
  }
);

testSuite.run();
