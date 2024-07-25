import { getAvailableCountries } from "./api";

const MIN_YEAR = 1900;
const MAX_YEAR = 9999;
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const validateYear = (year: string) => {
  const yearNumber = parseInt(year, 10);

  if (!isNaN(yearNumber) && yearNumber >= MIN_YEAR && yearNumber <= MAX_YEAR)
    return true;
  return false;
};

export const validateCountry = async (countryCode: string) => {
  const countries = await getAvailableCountries();

  return countries.some((country) => country.countryCode === countryCode);
};

export const parseArgs = async (args: string[]) => {
  if (args.length !== 2)
    throw new Error("Usage: node holiday.js <countryCode> <year_or_next>");

  const [countryCode, yearOrNext] = args;
  const isNext = yearOrNext === "next";
  const isValidateCountry = await validateCountry(countryCode);
  const isValidateYear = validateYear(yearOrNext);

  if (!isValidateCountry) throw new Error("Check : countryCode format");

  if (!isValidateYear && !isNext)
    throw new Error("Check : year_or_next format");

  return {
    countryCode,
    year: isNext
      ? parseInt(getCurrentYear()).toString()
      : parseInt(yearOrNext, 10).toString(),
    isNext,
  };
};
