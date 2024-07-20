import { getAvailableCountries } from "./api";

export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const isValidYear = (year: string): boolean => {
  const yearNumber = parseInt(year, 10);

  if (!isNaN(yearNumber) && yearNumber >= 1000 && yearNumber <= 9999)
    return true;

  return false;
};

export const validateCountry = async (countryCode: string) => {
  const countries = await getAvailableCountries();
  const countryCodes = countries.map((country) => country.countryCode);

  return countryCodes.includes(countryCode);
};

export const parseArgs = async (args: string[]) => {
  if (args.length !== 2) {
    throw new Error("Usage: node holiday.js <countryCode> <year_or_next>");
  }

  const [countryCode, yearOrNext] = args;
  const isNext = yearOrNext === "next";
  const isValidateCountry = await validateCountry(countryCode);
  if (!isValidateCountry) throw new Error("Check : countryCode format");

  if (!isValidYear(yearOrNext) && !isNext)
    throw new Error("Check : year_or_next format");

  return {
    countryCode,
    year: isNext
      ? parseInt(getCurrentYear()).toString()
      : parseInt(yearOrNext, 10).toString(),
    isNext,
  };
};
