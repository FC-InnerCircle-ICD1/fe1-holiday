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
exports.checkAvailableCountries = exports.getHolidays = void 0;
const BASE_URL = "https://date.nager.at/api/v3";
const getHolidays = (year, countryCode) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}/publicholidays/${year}/${countryCode}`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            const message = response.status === 404
                ? "CountryCode is unknown"
                : response.status === 400
                    ? "Validation failure"
                    : "";
            throw new Error(`Error fetching holidays:${response.status} ${response.statusText} ${message}`);
        }
        const holidays = yield response.json();
        return holidays;
    }
    catch (error) {
        console.error("Error fetching holidays:", error);
        throw error;
    }
});
exports.getHolidays = getHolidays;
const checkAvailableCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}/AvailableCountries`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching countries:${response.status} ${response.statusText}`);
        }
        const countries = yield response.json();
        return countries;
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
});
exports.checkAvailableCountries = checkAvailableCountries;
