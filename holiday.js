import { getHolidays, getNextHolidays } from './apis/holidays.js';
import { formatHolidayToString, getArguments } from './utils/helper.js';

const main = async () => {
  const args = getArguments();

  if (args.length < 2) {
    console.log(
      'node holiday.js 국가코드 연도_또는_next 와 같은 형태로 입력해주세요.'
    );
    return;
  }

  const [countryCode, year] = args;

  const isNext = year === 'next';

  try {
    const holidays = isNext
      ? await getNextHolidays({ countryCode })
      : await getHolidays({ countryCode, year });

    const formatedHolidays = holidays.map((holiday) =>
      formatHolidayToString(holiday)
    );

    console.log(formatedHolidays.join('\n'));
  } catch (error) {
    if (error.message === 'Not Found') {
      console.log('잘못된 국가코드를 입력하셨습니다.');
    }

    if (error.message === 'Bad Request') {
      console.log('잘못된 년도를 입력하셨습니다.');
    }
  }
};

main();
