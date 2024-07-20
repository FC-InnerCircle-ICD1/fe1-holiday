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
}

execute();
