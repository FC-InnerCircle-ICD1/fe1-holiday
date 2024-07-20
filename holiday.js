import { getHolidays, getNextHolidays } from './apis/holidays.js';
import { ERROR } from './contant/error.js';
import { getArguments } from './utils/arguments.js';
import { formatHoliday } from './utils/format.js';
import { checkValidCountryCode } from './utils/validate.js';

const main = async () => {
  const args = getArguments();

  if (args.length < 2) {
    console.log(ERROR.INVALID_USAGE);
    return;
  }

  const [countryCode, year] = args;

  const isValidCountryCode = await checkValidCountryCode({
    countryCode: countryCode.toUpperCase(),
  });

  if (!isValidCountryCode) {
    console.log(ERROR.INVALID_COUNTRY_CODE);
    return;
  }

  const isNext = year === 'next';

  let holidays;
  try {
    holidays = isNext
      ? await getNextHolidays({ countryCode })
      : await getHolidays({ countryCode, year });
  } catch (error) {
    console.log(error.message);
  }

  const formatedHolidays = holidays.map(formatHoliday);

  console.log(formatedHolidays.join('\n'));
};

main();
