const BASE_URL = "https://date.nager.at/api/v3";

//return type 수정

export type Holiday = {
  date: string;
  localName: string;
  name: string;
};
export const getHolidays = async (
  year: string,
  countryCode: string
): Promise<Holiday[]> => {
  const url = `${BASE_URL}/publicholidays/${year}/${countryCode}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error fetching holidays:${response.status} ${response.statusText}`
      );
    }
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};

export const checkAvailableCountries = async (): Promise<
  {
    countryCode: string;
    name: string;
  }[]
> => {
  const url = `${BASE_URL}/AvailableCountries`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error fetching countries:${response.status} ${response.statusText}`
      );
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
