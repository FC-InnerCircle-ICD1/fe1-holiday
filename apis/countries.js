import { BASE_URL } from '../contant/url.js';

const getAvailableCountries = async () => {
  const response = await fetch(`${BASE_URL}/AvailableCountries`);
  return response.json();
};

export { getAvailableCountries };
