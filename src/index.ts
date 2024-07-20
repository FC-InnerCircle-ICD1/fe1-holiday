const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node index.js <command> [options]");
  process.exit(1);
}
