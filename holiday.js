const HOLIDAY_API_URL = "https://date.nager.at/api/v3";
const [, , countryCodeInput, yearOrNext] = process.argv;

class HTTPError extends Error {
  constructor(response) {
    super(`HTTP error! status: ${response.status}`);
    this.code = response.status;
    this.response = response;
  }
}

const fetchClient = async (url) => {
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    throw new HTTPError(res);
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
  return fetchClient(fetchUrl);
};

const fetchAvailableCountries = async () => {
  const fetchUrl = `${HOLIDAY_API_URL}/AvailableCountries`;
  return fetchClient(fetchUrl);
};

const fetchNextPublicHoliday = async (_country) => {
  const fetchUrl = `${HOLIDAY_API_URL}/NextPublicHolidays/${_country}`;
  return fetchClient(fetchUrl);
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
