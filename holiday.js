const API_BASE_URL = 'https://date.nager.at/api/v3';

function formatHoliday(holidays) {
  let holidayText = '';

  holidays.forEach(({ date, localName, name }) => {
    holidayText += `${date} ${localName} ${name}\n`;
  });

  return holidayText;
}

function handleHolidayApiError(response) {
  if (response.ok === false) {
    if (response.status === 404) {
      console.error('Wrong country code');
      process.exit();
    }

    throw new Error(response.statusText);
  }
}

async function searchHoliday(countryCode, year) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`
    );

    handleHolidayApiError(response);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('error =', error);
  }
}

async function searchNextHoliday(countryCode) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/NextPublicHolidays/${countryCode}`
    );

    handleHolidayApiError(response);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error =', error);
  }
}

async function execute() {
  const [, , countryCode, year] = process.argv;

  if (!countryCode || !year) {
    console.error(
      '프로그램이 종료됩니다. 이유: 충분한 인수가 전달되지 않았습니다.'
    );
    process.exit();
  }

  let holidays;

  if (year === 'next') {
    holidays = await searchNextHoliday(countryCode);
  } else {
    holidays = await searchHoliday(countryCode, year);
  }

  console.log(formatHoliday(holidays));
}

execute();
