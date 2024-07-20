const API_URL = "https://date.nager.at/api/v3";

const args = process.argv.slice(2);
const [countryCode, yearOrNext] = args;

if (!countryCode || !yearOrNext) {
  console.error("Error: 인수가 충분하지 않습니다.");
  process.exit(1);
}

const countryCodeValidation = async (countryCode) => {
  const url = `${API_URL}/CountryInfo/${countryCode}`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    console.error(
      `Error: Wrong country code. Input countryCode: ${countryCode}`
    );
    process.exit(1);
  }
};

const print = (holidays) => {
  holidays.forEach((v) => {
    console.log(`${v.date} ${v.localName} ${v.name}`);
  });
};

const getPublicHolidays = async (countryCode, yearOrNext) => {
  countryCodeValidation(countryCode);
  if (yearOrNext === "next") {
    const url = `${API_URL}/NextPublicHolidays/${countryCode}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      print(data);
    }
  } else {
    const url = `${API_URL}/PublicHolidays/${yearOrNext}/${countryCode}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      print(data);
    }
  }
};

getPublicHolidays(countryCode, yearOrNext);
