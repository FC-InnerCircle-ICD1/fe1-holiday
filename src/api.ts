const BASE_URL = "https://date.nager.at/api/v3/publicholidays";

//return type 수정
export const getHolidays = async (
  year: string,
  countryCode: string
): Promise<any> => {
  const url = `${BASE_URL}/${year}/${countryCode}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching holidays: ${response.statusText}`);
    }
    const holidays = await response.json();
    return holidays;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
