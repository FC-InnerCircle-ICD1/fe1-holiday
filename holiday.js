"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const utils_1 = require("./utils");
const outputHolidays = (holidays) => {
    holidays.forEach(({ date, localName, name }) => console.log(`${date} ${name} ${localName}`));
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const args = process.argv.slice(2);
    try {
        const { countryCode, year, isNext } = yield (0, utils_1.parseArgs)(args);
        const holidays = isNext
            ? yield (0, api_1.getHolidayByNext)(countryCode)
            : yield (0, api_1.getHolidaysByYear)(year, countryCode);
        outputHolidays(holidays);
    }
    catch (error) {
        console.error(error.message);
        process.exit();
    }
});
main();
