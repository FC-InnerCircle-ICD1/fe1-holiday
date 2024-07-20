const getArguments = () => {
  const argv = process.argv;

  return argv.slice(2);
};

const formatHolidayToString = (holiday) => {
  const { date, name, localName } = holiday;
  return `${date} ${name} ${localName}`;
};

export { getArguments, formatHolidayToString };
