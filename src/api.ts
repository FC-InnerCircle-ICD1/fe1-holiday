const BASE_URL = "https://date.nager.at/api/v3";

export type Holiday = {
  date: string;
  localName: string;
  name: string;
};

export type Country = {
  countryCode: string;
  name: string;
};

const handleHolidayByYeaErrorMsg = (status: number) => {
  switch (status) {
    case 404:
      return "CountryCode is unknown";
    case 400:
      return "Validation failure";
    default:
      return "";
  }
};

export const getHolidaysByYear = async (
  year: string,
  countryCode: string
): Promise<Holiday[]> => {
  const url = `${BASE_URL}/publicholidays/${year}/${countryCode}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = handleHolidayByYeaErrorMsg(response.status);
    throw new Error(
      `Error fetching holidays:${response.status} ${response.statusText} ${message}`
    );
  }
  const holidays = await response.json();
  return holidays;
};

export const getAvailableCountries = async (): Promise<Country[]> => {
  const url = `${BASE_URL}/AvailableCountries`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching countries:${response.status} ${response.statusText}`
    );
  }
  const countries = await response.json();
  return countries;
};

export const getNextHoliday = async (
  countryCode: string
): Promise<Holiday[]> => {
  const url = `${BASE_URL}/NextPublicHolidays/${countryCode}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching countries:${response.status} ${response.statusText}`
    );
  }
  const holidays = await response.json();
  return holidays;
};
