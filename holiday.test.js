const { Exception, holiday } = require("./holiday.js");

function pass() {
  process.stdout.write(" ✅\n");
}

function fail(e) {
  process.stdout.write(" ❌\n");
  console.error(e);
}

async function test() {
  try {
    process.stdout.write("1. 국가코드와 연도 값은 필수여야한다");
    await holiday(["kr"]); // 국가코드만 넘기는 경우
  } catch (e) {
    if (e instanceof Exception && e.message === "연도는 필수 입력입니다.") {
      pass();
    } else {
      fail(e);
    }
  }

  try {
    process.stdout.write("2-1. 올바르지 않은 국가코드가 전달되면 'Wrong country code'를 출력한다");
    await holiday(["unknown", "2024"]); // 국가코드만 넘기는 경우
  } catch (e) {
    if (e instanceof Exception && e.message === "Wrong country code") {
      pass();
    } else {
      fail(e);
    }
  }

  try {
    process.stdout.write("2-2. 올바르지 않은 국가코드가 전달되면 'Wrong country code'를 출력한다");
    await holiday(["unknown", "next"]); // 국가코드만 넘기는 경우
  } catch (e) {
    if (e instanceof Exception && e.message === "Wrong country code") {
      pass();
    } else {
      fail(e);
    }
  }

  try {
    process.stdout.write("3. 올바르지 않은 연도가 전달되면 'Wrong Year'를 출력한다");
    await holiday(["kr", "unknown"]); // 국가코드만 넘기는 경우
  } catch (e) {
    if (e instanceof Exception && e.message === "Wrong Year") {
      pass();
    } else {
      fail(e);
    }
  }

  try {
    process.stdout.write("4-1. 년도별 공휴일 조회");
    await holiday(["kr", "2024"]); // 국가코드만 넘기는 경우
    pass();
  } catch (e) {
    fail(e);
  }

  try {
    process.stdout.write("4-1. 년도별 공휴일 조회");
    await holiday(["kr", "2024"]); // 국가코드만 넘기는 경우
    pass();
  } catch (e) {
    fail(e);
  }

  try {
    process.stdout.write("4-2. 오늘 이후 1년동안의 공휴일 조회");
    await holiday(["kr", "next"]); // 국가코드만 넘기는 경우
    pass();
  } catch (e) {
    fail(e);
  }
}

test();
