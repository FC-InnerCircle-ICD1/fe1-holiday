const [, , countryCode, year] = process.argv;

if (!countryCode) {
  console.error('프로그램이 종료됩니다. 이유: countryCode를 입력해주세요.');
  process.exit();
}

if (!year) {
  console.error('프로그램이 종료됩니다. 이유: year를 입력해주세요.');
  process.exit();
}
