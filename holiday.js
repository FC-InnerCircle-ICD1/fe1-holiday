const HOLIDAY_API_URL = "https://date.nager.at/api/v3";
const [, , countryCodeInput, yearOrNext] = process.argv;

class HTTPError extends Error {
  constructor(response) {
    super(`HTTP error! status: ${response.status}`);
    this.code = response.status;
    this.response = response;
  }
}

const requestJsonFromUrl = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new HTTPError(res);
  }

  return res.json();
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

const fetchHolidayYear = async (country, year) => {
  const fetchUrl = `${HOLIDAY_API_URL}/PublicHolidays/${year}/${country}`;
  return requestJsonFromUrl(fetchUrl);
};

const fetchAvailableCountries = async () => {
  const fetchUrl = `${HOLIDAY_API_URL}/AvailableCountries`;
  return requestJsonFromUrl(fetchUrl);
};

const fetchNextPublicHoliday = async (country) => {
  const fetchUrl = `${HOLIDAY_API_URL}/NextPublicHolidays/${country}`;
  return requestJsonFromUrl(fetchUrl);
};

const handleHolidaysError = (error) => {
  if (error instanceof HTTPError) {
    if (error.code === 400) {
      console.error("Validation Failure");
    }
    if (error.code === 404) {
      console.error(`CountryCode is unknown `);
    }
  }
  return;
};

(async function () {
  checkInputValues(countryCodeInput, yearOrNext);
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
    handleHolidaysError(error);
  } finally {
    process.exit(0);
  }
})();
