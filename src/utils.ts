import { checkAvailableCountries } from "./api";

export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const parseArgs = (
  args: string[]
): { countryCode: string; yearOrNext: string } => {
  const [countryCode, yearOrNext] = args;
  return { countryCode, yearOrNext };
};

export const isValidYear = (year: string): boolean => {
  const yearNumber = parseInt(year, 10);

  if (!isNaN(yearNumber) && yearNumber >= 1000 && yearNumber <= 9999)
    return true;

  return false;
};

export const validateCountry = async (countryCode: string) => {
  const countries = await checkAvailableCountries();
  const countryCodes = countries.map((country) => country.countryCode);

  return countryCodes.includes(countryCode);
};

export const validateArgs = async (args: string[]) => {
  if (args.length !== 2) {
    throw new Error("Usage: node holiday.js <countryCode> <year_or_next>");
  }

  const [countryCode, yearOrNext] = args;
  const isValidateCountry = await validateCountry(countryCode);
  if (!isValidateCountry) throw new Error("Check : countryCode");
  if (!isValidYear(yearOrNext) && yearOrNext !== "next")
    throw new Error("Check : year_or_next");

  return true;
};
