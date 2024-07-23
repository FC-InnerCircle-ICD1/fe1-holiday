export class TestSuite {
  private tests: { name: string; test: () => void | Promise<void> }[] = [];

  addTest(name: string, test: () => void | Promise<void>) {
    this.tests.push({ name, test });
  }

  async run() {
    console.log("====== 테스트 시작 ======");
    for (const { name, test } of this.tests) {
      try {
        await Promise.resolve(test());
        console.log(`✅ ${name} 테스트 성공`);
      } catch (error) {
        console.error(`❌ ${name} 실패: ${(error as Error).message}`);
      }
    }
  }
}

export const assertEquals = (actual: any, expected: any, message?: string) => {
  if (actual !== expected) {
    throw new Error(message || `기대값은 ${expected}, 결과는 ${actual}`);
  }
};
