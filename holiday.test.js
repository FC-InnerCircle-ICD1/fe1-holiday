const { describe, it } = require("node:test");
const assert = require("assert");
const { holiday } = require("./holiday.js");

describe("국가별 공휴일 조회 프로그램", () => {
  it("국가코드와 연도 값은 필수입니다.", async () => {
    try {
      await holiday(["kr"]);
    } catch (e) {
      assert.strictEqual("연도는 필수 입력입니다.", e.message);
    }
  });

  it("올바르지 않은 연도가 전달되면 'Wrong Year'를 출력한다", async () => {
    try {
      await holiday(["kr", "unknown"]);
    } catch (e) {
      assert.strictEqual("Wrong Year", e.message);
    }
  });

  describe("특정 연도별 조회 시", () => {
    it("올바르지 않은 국가코드가 전달되면 'Wrong country code'를 출력한다", async () => {
      try {
        await holiday(["unknown", "2024"]);
      } catch (e) {
        assert.strictEqual("Wrong country code", e.message);
      }
    });

    it("공휴일을 조회한다.", async () => {
      await holiday(["kr", "2024"]);
    });
  });

  describe("next 조회 시", () => {
    it("올바르지 않은 국가코드가 전달되면 'Wrong country code'를 출력한다", async () => {
      try {
        await holiday(["unknown", "next"]);
      } catch (e) {
        assert.strictEqual("Wrong country code", e.message);
      }
    });

    it("공휴일을 조회한다.", async () => {
      await holiday(["kr", "next"]);
    });
  });
});
