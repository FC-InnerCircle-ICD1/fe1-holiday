//todo: 예외 처리 상세 필요
//코드가 숫자가 아닐 경우, 코드가 유효한 국가코드가 아닐 경우
//연도가 next일때 다음 년도로 바꿔주기
//연도가 유효한 형식이 아닐 경우

const parseArgs = (
  args: string[]
): { countryCode: string; yearOrNext: string } => {
  if (args.length !== 2) {
    throw new Error("Usage: node holiday.js <countryCode> <year_or_next>");
  }
  const [countryCode, yearOrNext] = args;
  return { countryCode, yearOrNext };
};

const main = () => {
  const args = process.argv.slice(2);

  const { countryCode, yearOrNext } = parseArgs(args);
};

main();
