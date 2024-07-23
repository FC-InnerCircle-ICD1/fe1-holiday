async function run() {
  const [countryCode, years] = process.argv.slice(2);
  if (typeof countryCode !== "string") {
    return console.error("국가코드는 필수 입력입니다.");
  }

  if (typeof years !== "string") {
    return console.error("연도는 필수 입력입니다.");
  }

  const isNextYear = years === "next";
  const fetchUrl = isNextYear ? `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}` : `https://date.nager.at/api/v3/PublicHolidays/${years}/${countryCode}`;
  const res = await fetch(fetchUrl);
  const body = await res.json();
  if ((isNextYear && res.status === 500) || res.status === 404) {
    return console.error("Wrong country code");
  }
  if (res.status === 400) {
    return console.error(body.errors.year.join("\n"));
  }
  if (res.ok) {
    body.map(({ date, name, localName }) => console.log(`${date} ${name} ${localName}`));
  } else {
    console.error(res.statusText);
  }
}

run();
