import { Holiday, getHolidayByNext, getHolidaysByYear } from "./api";
import { parseArgs } from "./utils";

const outputHolidays = (holidays: Holiday[]) => {
  holidays.forEach(({ date, localName, name }) =>
    console.log(`${date} ${name} ${localName}`)
  );
};

const main = async () => {
  const args = process.argv.slice(2);
  try {
    const { countryCode, year, isNext } = await parseArgs(args);
    const holidays = isNext
      ? await getHolidayByNext(countryCode)
      : await getHolidaysByYear(year, countryCode);
    outputHolidays(holidays);
  } catch (error: any) {
    console.error(error.message);
    process.exit();
  }
};

main();
