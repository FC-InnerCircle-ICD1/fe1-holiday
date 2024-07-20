const getArguments = () => {
  const argv = process.argv;

  return argv.slice(2);
};

export { getArguments };
