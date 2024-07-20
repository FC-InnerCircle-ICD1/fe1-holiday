const https = require("https");

// 함수 정의: year와 countryCode를 받아서 API 호출
const getPublicHolidays = async (year, countryCode) => {
  let y = year === "next" ? new Date().getFullYear() : year;
  const c = countryCode;

  const url = `https://date.nager.at/api/v3/publicholidays/${y}/${c}`;

  /**
   * @desc holiday 반환처리
   * @param {*} data
   * @param {*} today
   * @returns
   */
  const returnHolidays = (data, today) => {
    data.forEach((holiday) => {
      const { date, name, localName } = holiday;
      const holidayDate = new Date(date);

      // year가 next인 경우, 오늘 이후의 공휴일만 출력
      if (year === "next" && holidayDate > today) {
        console.log(`${date} ${name} ${localName}`);
      } else if (year !== "next") {
        console.log(`${date} ${name} ${localName}`);
      }
    });
  };

  try {
    const response = await fetch(url);
    if (response.ok) {
      const holidays = await response.json();
      const today = new Date();

      // 반환
      return returnHolidays(holidays, today);
    }

    if (!response.ok) {
      if (response.status === 400) {
        console.error("Validation failure");
        process.exit(1);
      }

      if (response.status === 404) {
        console.error("Error: 존재하지 않는 국가코드입니다.");
        process.exit(1);
      }

      console.error(`Error: ${response.statusText}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
};

// Node.js 명령어 인수를 받아서 함수 호출
const args = process.argv.slice(2);
const [countryCode, year] = args;

if (!countryCode || !year) {
  console.error("Usage: node holiday.js <countryCode> <year>");
  process.exit(1);
}

// 함수 실행
getPublicHolidays(year, countryCode);
