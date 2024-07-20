const https = require("https");

// 함수 정의: year와 countryCode를 받아서 API 호출
const getPublicHolidays = (year, countryCode) => {
  let y = year == "next" ? new Date().getFullYear() : year;
  const c = countryCode;

  /**
   * @desc api option
   */
  const options = {
    hostname: "date.nager.at",
    port: 443,
    path: `/api/v3/publicholidays/${y}/${c}`,
    method: "GET",
  };

  /**
   * @desc holiday 반환처리
   * @param {*} data
   * @param {*} today
   * @returns
   */
  const returnHolidays = (data, today) => {
    return data.forEach((holiday) => {
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

  /**
   * @desc api 소통함수
   */
  const req = https.request(options, (res) => {
    // 상태코드 200일 경우.
    if (res.statusCode === 200) {
      let data = [];

      // 데이터가 들어올 때마다 호출됨
      res.on("data", (chunk) => {
        data += chunk;
      });

      // 응답이 완료되었을 때 호출됨
      res.on("end", async () => {
        try {
          const holidays = JSON.parse(data);
          const today = new Date();

          // 반환
          return returnHolidays(holidays, today);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    }

    // Validation failure
    // 유효성 검증 실패
    if (res.statusCode === 400) {
      console.error("Validation failure");
      process.exit(1);
    }

    // CountryCode is unknown
    // 국가코드 미존재로 인한 에러
    if (res.statusCode === 404) {
      console.error("Error: 존재하지 않는 국가코드입니다.");
      process.exit(1);
    }
  });

  //   소통함수 실행
  req.end();
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
