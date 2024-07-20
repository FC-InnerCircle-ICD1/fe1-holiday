import axios from "axios";

const BASE_URL = "https://date.nager.at/api/v3/publicholidays";

//return type 수정
export const getHolidays = async (
  year: string,
  countryCode: string
): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${year}/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
