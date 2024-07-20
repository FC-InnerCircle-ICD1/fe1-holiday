const [countryCode, year] = process.argv.slice(2);

const getHolidaysApi = async (countryCode, year) => {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

  const data = await fetch(url);

  if (data.status === 400) {
    console.log("연도를 확인해주세요");
    return;
  }
  if (data.status === 404) {
    console.log("국가 코드를 확인해주세요");
    return;
  }
  const res = await data.json();
  return res;
};
const getNextHolidaysApi = async (countryCode) => {
  const url = `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`;
  const data = await fetch(url);

  if (data.status === 500) {
    console.log("국가 코드를 확인해주세요");
    return;
  }
  const res = await data.json();
  return res;
};

const printDay = (day) =>
  console.log(`${day.date} ${day.name} ${day.localName}`);

const main = async (countryCode, year) => {
  const holidays =
    year === "next"
      ? await getNextHolidaysApi(countryCode)
      : await getHolidaysApi(countryCode, year);
  holidays && holidays.forEach(printDay);
};

main(countryCode, year);
