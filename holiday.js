const https = require("https");
const HOLIDAY_API_URL = "https://date.nager.at/api/v3";

const [, , countryCodeInput, yearOrNext] = process.argv;

const countryCode = countryCodeInput.toUpperCase();
const year = parseInt(yearOrNext);

const fetchHoliday = (_country, _year) => {
  return new Promise((resolve, reject) => {
    https
      .get(`${HOLIDAY_API_URL}/PublicHolidays/${_year}/${_country}`, (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          const holidays = JSON.parse(data);
          resolve(holidays);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
