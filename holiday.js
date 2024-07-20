const API_HOST = "https://date.nager.at";

const EXPECTED_ARGV_LENGTH = 4;

const validateCountryCode = async (countryCode) => {
  const result = await fetch(`${API_HOST}/api/v3/CountryInfo/${countryCode}`);
  return result.ok;
};

const main = async () => {
  if (process.argv.length !== EXPECTED_ARGV_LENGTH) {
    console.error(
      '"node holiday.js 국가코드 연도_또는_next" 형식으로 입력해주세요.'
    );
    return;
  }

  const [, , countryCode, year] = process.argv;

  if (!(await validateCountryCode(countryCode))) {
    console.error("Wrong country code");
    return;
  }
};

main();
