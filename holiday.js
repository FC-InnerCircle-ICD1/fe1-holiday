const baseURL = `https://date.nager.at/api/v3`;

const printHolidays = (holidays) => {
  return holidays.forEach((holiday) => {
    const { date, name, localName } = holiday;

    console.log(`${date} ${name} ${localName}`);
  });
};

const fetchNextHolidays = async (countryCode) => {
  try {
    const res = await fetch(`${baseURL}/NextPublicHolidays/${countryCode}`);

    if (res.status === 404) {
      throw new Error("Error: 존재하지 않는 국가코드입니다.");
    }

    if (!res.ok) {
      throw new Error(`HTTP Error status : ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const fetchHolidays = async (countryCode, year) => {
  try {
    const res = await fetch(`${baseURL}/publicholidays/${year}/${countryCode}`);

    if (res.ok) {
      return res.json();
    }

    if (res.status === 400) {
      throw new Error("Error: Validation failure");
    }

    if (res.status === 404) {
      throw new Error("Error: 존재하지 않는 국가코드입니다.");
    }

    console.error(`Error: ${res.statusText}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getHolidays = async (countryCode, yearOrNext) => {
  return yearOrNext === "next"
    ? fetchNextHolidays(countryCode)
    : fetchHolidays(countryCode, yearOrNext);
};

const main = async (countryCode, yearOrNext) => {
  const holidays = await getHolidays(countryCode, yearOrNext);
  if (holidays) {
    printHolidays(holidays);
  }
};

const args = process.argv.slice(2);

if (args?.length != 2) {
  console.log(`arg 인수가 옳지 않습니다.`);
}

main(...args);
