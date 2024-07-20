function run() {
  const [code, years] = process.argv.slice(2);
  if (typeof code !== "string") {
    return console.error("국가코드는 필수 입력입니다.");
  }

  if (typeof years !== "string") {
    return console.error("연도는 필수 입력입니다.");
  }
}

run();
