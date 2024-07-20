import { Holiday, getHolidays } from "./api";
import { getCurrentYear, parseArgs } from "./utils";

const outputHolidays = (holidays: Holiday[]) => {
  holidays.forEach(({ date, localName, name }) =>
    console.log(`${date} ${name} ${localName}`)
  );
};

const main = async () => {
  const args = process.argv.slice(2);

  const { countryCode, yearOrNext } = await parseArgs(args);
  const year =
    yearOrNext.toLowerCase() === "next"
      ? (parseInt(getCurrentYear()) + 1).toString()
      : yearOrNext;

  const holidays = await getHolidays(year, countryCode);
  outputHolidays(holidays);
};

main();
