import { isInteger } from "./validation.js";

console.log("isInteger는");

console.log(
  "\t빈 문자열을 입력하면, false를 리턴한다.",
  "result:",
  isInteger("")
);

console.log(
  "\t'2024'를 입력하면, true를 리턴한다.",
  "result:",
  isInteger("2024")
);

console.log(
  "\t'-2024'를 입력하면, true를 리턴한다.",
  "result:",
  isInteger("-2024")
);

console.log(
  "\t'02024'를 입력하면, false를 리턴한다.",
  "result:",
  isInteger("02024")
);
