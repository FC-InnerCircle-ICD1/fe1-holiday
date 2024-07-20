import { getAvailableCountries } from '../apis/countries.js';

const checkValidCountryCode = async ({ countryCode }) => {
  const availableCountries = await getAvailableCountries();

  const isValidCountryCode = availableCountries.some(
    (availableCountry) => availableCountry.countryCode === countryCode
  );

  return isValidCountryCode;
};

export { checkValidCountryCode };
