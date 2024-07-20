import { Holiday, getHolidays } from "./api";
import { getCurrentYear, parseArgs, validateArgs } from "./utils";

const outputHolidays = (holidays: Holiday[]) => {
  holidays.forEach(({ date, localName, name }) =>
    console.log(`${date} ${name} ${localName}`)
  );
};

const main = async () => {
  const args = process.argv.slice(2);

  const isValidate = await validateArgs(args);
  if (!isValidate) process.exit();
  const { countryCode, yearOrNext } = parseArgs(args);
  const year =
    yearOrNext.toLowerCase() === "next"
      ? (parseInt(getCurrentYear()) + 1).toString()
      : yearOrNext;

  const holidays = await getHolidays(year, countryCode);
  outputHolidays(holidays);
};

main();
