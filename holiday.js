const HOLIDAY_API_URL = "https://date.nager.at/api/v3";
const [, , countryCodeInput, yearOrNext] = process.argv;

class HTTPError extends Error {
  constructor(response) {
    super(`HTTP error! status: ${response.status}`);
    this.code = response.status;
    this.response = response;
  }
}

const isHTTPError = (error) => error instanceof HTTPError;

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

const fetchNextPublicHoliday = async (country) => {
  const fetchUrl = `${HOLIDAY_API_URL}/NextPublicHolidays/${country}`;
  return requestJsonFromUrl(fetchUrl);
};

const fetchCountryInfo = async (countryCode) => {
  const fetchUrl = `${HOLIDAY_API_URL}/CountryInfo/${countryCode}`;
  return requestJsonFromUrl(fetchUrl);
};

const checkCountryCode = async (countryCode) => {
  try {
    await fetchCountryInfo(countryCode);
  } catch (error) {
    if (isHTTPError(error)) {
      if (error.code === 404) {
        console.error(`Wrong country code: ${countryCode}`);
        throw new Error("Wrong country code");
      }
    }
  }
};

const handleGetHolidaysError = (error) => {
  if (isHTTPError(error)) {
    if (error.code === 400) {
      console.error("Validation Failure");
    }
    if (error.code === 404) {
      console.error(`Wrong country code`);
    }
  } else {
    console.error(error.message);
  }
};

(async function () {
  try {
    checkInputValues(countryCodeInput, yearOrNext);
    await checkCountryCode(countryCodeInput);

    const { isNext, year } = extractYearOrNext(yearOrNext);
    const countryCode = countryCodeInput.toUpperCase();

    const holidays = isNext
      ? await fetchNextPublicHoliday(countryCode)
      : await fetchHolidayYear(countryCode, year);

    if (holidays.length === 0) {
      throw new Error("No holidays found");
    }

    const result = holidays.map((holiday) => {
      return [holiday.date, holiday.name, holiday.localName].join(" ");
    });

    console.log(result.join("\n"));
    process.exit(0);
  } catch (error) {
    handleGetHolidaysError(error);
    process.exit(1);
  }
})();
