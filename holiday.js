const API_URL = "https://date.nager.at/api/v3";

const args = process.argv.slice(2);
const [countryCode, yearOrNext] = args;

if (!countryCode || !yearOrNext) {
  console.error("Error: Not enough parameters.");
  process.exit(1);
}

const getPublicHolidays = async (countryCode, yearOrNext) => {
  const uppercaseCountryCode = countryCode.toUpperCase();
  validateCountryCode(uppercaseCountryCode);
  const url =
    yearOrNext.toLowerCase() === "next"
      ? `${API_URL}/NextPublicHolidays/${uppercaseCountryCode}`
      : `${API_URL}/PublicHolidays/${yearOrNext}/${uppercaseCountryCode}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    printHolidays(data);
  } else {
    console.error(`Error: ${response.title}`);
  }
};

const validateCountryCode = async (countryCode) => {
  const url = `${API_URL}/CountryInfo/${countryCode}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(
      `Error: Wrong country code. Input countryCode: ${countryCode}`
    );
    process.exit(1);
  }
};

const printHolidays = (holidays) => {
  holidays.forEach((v) => {
    console.log(`${v.date} ${v.localName} ${v.name}`);
  });
};

getPublicHolidays(countryCode, yearOrNext);
