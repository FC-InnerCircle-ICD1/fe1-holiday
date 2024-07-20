const https = require("https");

// 함수 정의: year와 countryCode를 받아서 API 호출
function getPublicHolidays(year, countryCode) {
  let y = year == "next" ? new Date().getFullYear() : year;
  const c = countryCode;

  // 옵션 설정
  const options = {
    hostname: "date.nager.at",
    port: 443,
    path: `/api/v3/publicholidays/${y}/${c}`,
    method: "GET",
  };

  // 요청 생성
  const req = https.request(options, (res) => {
    // 상태코드 200일 경우.
    if (res.statusCode === 200) {
      let data = [];

      // 데이터가 들어올 때마다 호출됨
      res.on("data", (chunk) => {
        data += chunk;
      });

      // 응답이 완료되었을 때 호출됨
      res.on("end", () => {
        try {
          const holidays = JSON.parse(data);
          // 오늘 이후 날짜를 구합니다.
          const today = new Date();

          //  양식에 맞는 배열처리
          holidays.forEach((holiday) => {
            const { date, name, localName } = holiday;
            const holidayDate = new Date(date);

            // year가 next인 경우, 오늘 이후의 공휴일만 출력
            if (year === "next" && holidayDate > today) {
              console.log(`${date} ${name} ${localName}`);
            } else if (year !== "next") {
              console.log(`${date} ${name} ${localName}`);
            }
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    }

    // Validation failure
    // 유효성 검증 실패
    if (res.statusCode === 400) {
      return console.error("Validation failure");
    }

    // CountryCode is unknown
    // 국가코드 미존재로 인한 에러
    if (res.statusCode === 404) {
      return console.error("Error: 존재하지 않는 국가코드입니다.");
    }
  });
  req.end();
}

// Node.js 명령어 인수를 받아서 함수 호출
const args = process.argv.slice(2);
const [countryCode, year] = args;

if (!countryCode || !year) {
  console.error("Usage: node holiday.js <countryCode> <year>");
  process.exit(1);
}

// 함수 실행
getPublicHolidays(year, countryCode);
