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
exports.parseArgs = exports.validateCountry = exports.isValidYear = exports.getCurrentYear = void 0;
const api_1 = require("./api");
const getCurrentYear = () => {
    return new Date().getFullYear().toString();
};
exports.getCurrentYear = getCurrentYear;
const isValidYear = (year) => {
    const yearNumber = parseInt(year, 10);
    if (!isNaN(yearNumber) && yearNumber >= 1000 && yearNumber <= 9999)
        return true;
    return false;
};
exports.isValidYear = isValidYear;
const validateCountry = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    const countries = yield (0, api_1.checkAvailableCountries)();
    const countryCodes = countries.map((country) => country.countryCode);
    return countryCodes.includes(countryCode);
});
exports.validateCountry = validateCountry;
const parseArgs = (args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.length !== 2) {
        throw new Error("Usage: node holiday.js <countryCode> <year_or_next>");
    }
    const [countryCode, yearOrNext] = args;
    const isValidateCountry = yield (0, exports.validateCountry)(countryCode);
    if (!isValidateCountry)
        throw new Error("Check : countryCode");
    if (!(0, exports.isValidYear)(yearOrNext) && yearOrNext !== "next")
        throw new Error("Check : year_or_next");
    return { countryCode, yearOrNext };
});
exports.parseArgs = parseArgs;
