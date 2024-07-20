import axios from "axios";

const BASE_URL = "https://date.nager.at/Api/v2/PublicHoliday";

//return type 수정
export const getHolidays = async (
  countryCode: string,
  year: string
): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${year}/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
