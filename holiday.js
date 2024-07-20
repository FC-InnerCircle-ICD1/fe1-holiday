const https = require('https');

const API_URL = 'https://date.nager.at/api/v3/publicholidays/2024/AT';

const args = process.argv.slice(2);
const [countryCode, yearOrNext] = args;
