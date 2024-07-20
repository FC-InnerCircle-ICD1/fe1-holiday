const API_BASE_URL = 'https://date.nager.at/api/v3';

async function searchHoliday(countryCode, year) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`
    );

    if (response.ok === false) {
      throw new Error('서버와 통신할 때 에러가 발생했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error =', error);
  }
}

async function execute() {
  const [, , countryCode, year] = process.argv;

  if (!countryCode) {
    console.error('프로그램이 종료됩니다. 이유: countryCode를 입력해주세요.');
    process.exit();
  }

  if (!year) {
    console.error('프로그램이 종료됩니다. 이유: year를 입력해주세요.');
    process.exit();
  }

  // TODO: 유효한 국가 코드 검사
  // if (isValidCountryCode(countryCode)) {
  //   console.error(
  //     '프로그램이 종료됩니다. 이유: countryCode가 유효하지 않습니다.'
  //   );
  //   process.exit();
  // }

  const holidays = await searchHoliday(countryCode, year);
}

execute();
