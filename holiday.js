const [, , countryCodeInput, yearOrNext] = process.argv;

const countryCode = countryCodeInput.toUpperCase();
const year = parseInt(yearOrNext);
