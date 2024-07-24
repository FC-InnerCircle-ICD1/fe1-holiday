import { describe, it } from 'node:test';
import assert from 'node:assert';

import { isInteger } from "./validation.js";

describe('isInteger는', (t) => {
  it('빈 문자열을 입력하면, false를 리턴한다.', () => {
    const result = isInteger('');

    assert.strictEqual(result, false);
  });

  it('"2024"를 입력하면, true를 리턴한다.', () => {
    const result = isInteger("2024");

    assert.strictEqual(result, true);
  });

  it('"-2024"를 입력하면, true를 리턴한다.', () => {
    const result = isInteger("-2024");

    assert.strictEqual(result, true);
  });

  it('"02024"를 입력하면, false를 리턴한다.', () => {
    const result = isInteger("02024");

    assert.strictEqual(result, false);
  });
});
