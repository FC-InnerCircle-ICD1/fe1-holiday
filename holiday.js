const EXPECTED_ARGV_LENGTH = 4;

const main = () => {
  if (process.argv.length !== EXPECTED_ARGV_LENGTH) {
    console.error(
      '"node holiday.js 국가코드 연도_또는_next" 형식으로 입력해주세요.'
    );
    return;
  }
};

main();
