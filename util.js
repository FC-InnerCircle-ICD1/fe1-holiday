import { EXPECTED_ARGV_LENGTH } from "./constants.js";

export const isInteger = (str) => {
  if (str.length === 0) return false;

  const num = Number(str);
  return Number.isInteger(num) && num.toString() === str;
};

export const isArgumentsValid = (argv) => {
  return (
    process.argv.length === EXPECTED_ARGV_LENGTH &&
    (isInteger(process.argv[3]) || process.argv[3] === "next")
  );
};
