class Exception extends Error {
  constructor(message) {
    super(message);
  }
}

async function holiday([countryCode, year]) {
  // 인자가 없는 경우, 도움말을 출력하도록 수정
  // if (typeof countryCode !== "string") {
  //   throw new Exception("국가코드는 필수 입력입니다.");
  // }

  if (typeof year !== "string") {
    throw new Exception("연도는 필수 입력입니다.");
  }

  const isNextYear = year === "next";
  const fetchUrl = `https://date.nager.at/api/v3/${isNextYear ? `NextPublicHolidays/${countryCode}` : `PublicHolidays/${year}/${countryCode}`}`;
  const res = await fetch(fetchUrl);

  if (res.ok) {
    const body = await res.json();
    return body.map(({ date, name, localName }) => `${date} ${name} ${localName}`).join("\n");
  }

  // 실패 시에 대한 처리
  if (isNextYear) {
    if (res.status === 500) throw new Exception("Wrong country code");
  } else {
    if (res.status === 404) throw new Exception("Wrong country code");
    if (res.status === 400) throw new Exception("Wrong Year");
  }
  throw new Exception(`HTTP StatusCode: ${res.status} \n${res.statusText}`);
}

function help() {
  console.log("국가별 공휴일 조회 프로그램");
  console.log("Usage");
  console.log("node holiday.js [국가코드] [연도_또는_next]");
  console.log("Example");
  console.log("node holiday.js kr next");
}

async function run() {
  if (process.argv.length === 2) return help();

  try {
    console.log(await holiday(process.argv.slice(2)));
  } catch (e) {
    if (e instanceof Exception) {
      console.error(e.message);
    } else {
      console.error(e);
    }
  }
}

if (process.argv[1] === __filename) run();

module.exports = { holiday, Exception };
