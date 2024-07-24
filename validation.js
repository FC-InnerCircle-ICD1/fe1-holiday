import { EXPECTED_ARGV_LENGTH } from "./constants.js";

export const isInteger = (str) => {
  if (str.length === 0) return false;

  const num = Number(str);
  return Number.isInteger(num) && num.toString() === str;
};

export const isArgumentsValid = (argv) => {
  return (
    argv.length === EXPECTED_ARGV_LENGTH &&
    (isInteger(argv[3]) || argv[3] === "next")
  );
};
