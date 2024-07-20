const formatHoliday = (holiday) => {
  const { date, name, localName } = holiday;
  return `${date} ${name} ${localName}`;
};

export { formatHoliday };
