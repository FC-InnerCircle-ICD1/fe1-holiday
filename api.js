const BASE_URL = "https://date.nager.at/api/v3";

export const getHolidays = async (countryCode, yearOrNext) => {
  let url;
  if (yearOrNext === "next") {
    url = `${BASE_URL}/NextPublicHolidays/${countryCode}`;
  } else {
    url = `${BASE_URL}/PublicHolidays/${yearOrNext}/${countryCode}`;
  }

  const result = await fetch(url);

  if (!result.ok) {
    if (result.status === 400) {
      console.error("연도가 범위를 벗어났습니다.");
      process.exit(1);
    } else {
      console.error(`HTTP error! status: ${result.status}`);
      process.exit(1);
    }
  }

  return await result.json();
};
