const [countryCode, year] = process.argv.slice(2);
const url2 = `/api/v3/NextPublicHolidays/${countryCode}`;

const getHolidayApi = async () => {
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
  console.log(res);
  return res;
};
const getNextHolidayApi = async () => {
  const url = `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`;
  const data = await fetch(url);

  if (data.status === 500) {
    console.log("국가 코드를 확인해주세요");
    return;
  }
  const res = await data.json();
  console.log(res);
  return res;
};

const fetchHolidays = () => {
  year === "next" ? getNextHolidayApi() : getHolidayApi();
};

fetchHolidays(countryCode, year);
