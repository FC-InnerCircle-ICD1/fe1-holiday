export const printHolidays = (holidays) => {
  holidays.forEach(holiday => {
      console.log(`${holiday.date} ${holiday.localName} ${holiday.name}`);
  });
};
