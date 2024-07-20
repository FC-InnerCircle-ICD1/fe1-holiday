const https = require("https");

// 함수 정의: year와 countryCode를 받아서 API 호출
function getPublicHolidays(year, countryCode) {
  // 옵션 설정
  const options = {
    hostname: "date.nager.at",
    port: 443,
    path: `/api/v3/publicholidays/${year}/${countryCode}`,
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
          holidays.forEach((holiday) => {
            const { date, name, localName } = holiday;
            console.log(`${date} ${name} ${localName}`);
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    }

    //
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
