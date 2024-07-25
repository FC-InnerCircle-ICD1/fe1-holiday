const API_URL = 'https://date.nager.at/api/v3';

export const getSupportedCountryCodes = async () => {
    try {
        const response = await fetch(`${API_URL}/AvailableCountries`);
        if (response.ok) {
            const countries = await response.json();
            return countries.map(country => country.countryCode);
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export const getHolidaysForYear = async (countryCode, year) => {
    try {
        const url = `${API_URL}/PublicHolidays/${year}/${countryCode}`;
        console.log(`Request URL: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export const getNextPublicHolidays = async (countryCode) => {
  try {
      const url = `${API_URL}/NextPublicHolidays/${countryCode}`;
      console.log(`Request URL: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
          return await response.json();
      } else {
          throw new Error(`Error: ${response.status}`);
      }
  } catch (error) {
      throw new Error(`Error: ${error.message}`);
  }
};
