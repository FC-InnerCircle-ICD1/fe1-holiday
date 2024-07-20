async function run() {
  const [countryCode, years] = process.argv.slice(2);
  if (typeof countryCode !== "string") {
    return console.error("국가코드는 필수 입력입니다.");
  }

  if (typeof years !== "string") {
    return console.error("연도는 필수 입력입니다.");
  }

  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${years}/${countryCode}`
  );
  const body = await res.json();
  if (res.status === 404) {
    return console.error("Wrong country code");
  }
  if (res.status === 400) {
    return console.error(body.errors.year.join("\n"));
  }
  if (res.status === 200) {
    body.map(({ date, name, localName }) =>
      console.log(`${date} ${name} ${localName}`)
    );
  }
}

run();
