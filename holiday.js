class Exception extends Error {
  constructor(message) {
    super(message);
  }
}

async function holiday([countryCode, year]) {
  if (typeof countryCode !== "string") {
    throw new Exception("국가코드는 필수 입력입니다.");
  }

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

async function run() {
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
