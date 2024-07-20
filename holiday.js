const printUsage = () => {
  console.log("사용법: node holiday.js <country_code> <year_or_next>");
  console.log("예시: node holiday.js KR 2024");
  console.log("예시: node holiday.js US next");
};

const fetchHolidays = async (countryCode, yearOrNext) => {
  let url;
  if (yearOrNext === "next") {
    url = `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`;
  } else {
    url = `https://date.nager.at/api/v3/PublicHolidays/${yearOrNext}/${countryCode}`;
  }

  const response = await fetch(url);

  if (
    response.status === 404 ||
    (yearOrNext === "next" && response.status === 500)
  ) {
    throw new Error("Wrong country code");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const getPublicHolidays = async () => {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    printUsage();
    process.exit(1);
  }

  const [countryCode, yearOrNext] = args;

  try {
    const holidays = await fetchHolidays(countryCode, yearOrNext);

    if (holidays.length === 0) {
      console.log("No holidays found.");
    } else {
      holidays.forEach((holiday) => {
        console.log(`${holiday.date} ${holiday.name} ${holiday.localName}`);
      });
    }
  } catch (error) {
    if (error.message === "Wrong country code") {
      console.error("Wrong country code");
    } else {
      console.error("An error occurred:", error.message);
    }
    process.exit(1);
  }
};

getPublicHolidays();
