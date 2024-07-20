const HOLIDAY_API_URL = "https://date.nager.at/api/v3";
const [, , countryCodeInput, yearOrNext] = process.argv;

const request = async (url) => {
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return json;
};

const checkInputValues = (countryCodeInput, yearOrNext) => {
  if (!countryCodeInput || !yearOrNext) {
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

const extractYearOrNext = (yearOrNext) => {
  const isNext =
    isNaN(parseInt(yearOrNext)) &&
    String(yearOrNext).toLocaleLowerCase() === "next";
  const year = isNext ? new Date().getFullYear() : parseInt(yearOrNext);

  return {
    isNext,
    year,
  };
};

const fetchHolidayYear = async (_country, _year) => {
  const fetchUrl = `${HOLIDAY_API_URL}/PublicHolidays/${_year}/${_country}`;
  return request(fetchUrl);
};

const fetchAvailableCountries = async () => {
  const fetchUrl = `${HOLIDAY_API_URL}/AvailableCountries`;
  return request(fetchUrl);
};

const fetchNextPublicHoliday = async (_country) => {
  const fetchUrl = `${HOLIDAY_API_URL}/NextPublicHolidays/${_country}`;
  return request(fetchUrl);
};

const checkAvailableCountriesCode = async (countryCode) => {
  console.log("a");
  try {
    const availableCountries = await fetchAvailableCountries();
    const availableCountryCodes = availableCountries.map(
      (country) => country.countryCode
    );

    if (!availableCountryCodes.includes(countryCode.toUpperCase())) {
      console.error(`Country code ${countryCode} is not available`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Wrong country code");
    process.exit(1);
  }
};

(async function () {
  checkInputValues(countryCodeInput, yearOrNext);
  checkAvailableCountriesCode(countryCodeInput);

  const { isNext, year } = extractYearOrNext(yearOrNext);
  const countryCode = countryCodeInput.toUpperCase();

  try {
    const holidays = isNext
      ? await fetchNextPublicHoliday(countryCode)
      : await fetchHolidayYear(countryCode, year);

    if (holidays.length === 0) {
      console.log(`No holidays found for ${countryCode} in ${year}`);
      process.exit(0);
    }

    const result = holidays
      .map((holiday) => {
        return [holiday.date, holiday.name, holiday.localName].join(" ");
      })
      .filter((holiday) => holiday !== null);

    console.log(result.join("\n"));
  } catch (error) {
    console.error(error, "Error fetching holidays");
  } finally {
    process.exit(0);
  }
})();
