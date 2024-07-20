const HOLIDAY_API_URL = "https://date.nager.at/api/v3";
const [, , countryCodeInput, yearOrNext] = process.argv;

const checkInputValues = (countryCodeInput, yearOrNext) => {
  if (countryCodeInput === undefined || yearOrNext === undefined) {
    console.error(
      "Please provide a country code and a year or 'next' as arguments"
    );
    process.exit(1);
  }

  if (countryCodeInput.length !== 2) {
    console.error("Country code must be 2 characters long");
    process.exit(1);
  }
};

const checkYearOrNext = (yearOrNext) => {
  const isNext =
    isNaN(parseInt(yearOrNext)) &&
    String(yearOrNext).toLocaleLowerCase() === "next";
  const year = isNext ? new Date().getFullYear() : parseInt(yearOrNext);

  return year;
};

checkInputValues(countryCodeInput, yearOrNext);

const year = checkYearOrNext(yearOrNext);
const countryCode = countryCodeInput.toUpperCase();
const TODAY = new Date();

const fetchHolidayYear = async (_country, _year) => {
  const fetchUrl = `${HOLIDAY_API_URL}/PublicHolidays/${_year}/${_country}`;
  const res = await fetch(fetchUrl);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status} ${res}`);
  }

  return res.json();
};

fetchHolidayYear(countryCode, year)
  .then((holidays) => {
    if (holidays.length === 0) {
      console.log(`No holidays found for ${countryCode} in ${year}`);
      process.exit(0);
    }

    return holidays
      .map((holiday) => {
        if (new Date(holiday.date).getTime() <= TODAY.getTime()) {
          return null;
        }
        return [holiday.date, holiday.name, holiday.localName].join(" ");
      })
      .filter((holiday) => holiday !== null);
  })
  .then((holidays) => {
    console.log(holidays.join("\n"));
  })
  .catch((err) => {
    console.error(err);
  });
