import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import {
  getSupportedCountryCodes,
  getHolidaysForYear,
  getNextPublicHolidays,
} from '../api.js';

import {
  printHolidays
} from '../utils.js';

const API_URL = 'https://date.nager.at/api/v3';

describe('Holiday Module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('getSupportedCountryCodes', () => {
      it('should return a list of supported country codes', async () => {
          const mockResponse = [{ countryCode: 'US' }, { countryCode: 'KR' }];

          fetchMock.get(`${API_URL}/AvailableCountries`, mockResponse);

          const countryCodes = await getSupportedCountryCodes();
          expect(countryCodes).to.include('US');
          expect(countryCodes).to.include('KR');
      });

      it('should throw an error if the request fails', async () => {
          fetchMock.get(`${API_URL}/AvailableCountries`, 500);

          try {
              await getSupportedCountryCodes();
          } catch (error) {
              expect(error.message).to.equal('Error: Error: 500');
          }
      });
  });

  describe('getHolidaysForYear', () => {
      it('should return a list of holidays for a given year and country code', async () => {
          const mockResponse = [
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-01-01',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '새해',
                  name: 'New Year\'s Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-02-09',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-02-10',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-02-12',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-03-01',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '3·1절',
                  name: 'Independence Movement Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-05-06',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '어린이날',
                  name: 'Children\'s Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-05-15',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '부처님 오신 날',
                  name: 'Buddha\'s Birthday',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-06-06',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '현충일',
                  name: 'Memorial Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-08-15',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '광복절',
                  name: 'Liberation Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-16',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-17',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-18',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-10-03',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '개천절',
                  name: 'National Foundation Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-10-09',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '한글날',
                  name: 'Hangul Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-12-25',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '크리스마스',
                  name: 'Christmas Day',
                  types: ['Public']
              }
          ];

          fetchMock.get(`${API_URL}/PublicHolidays/2024/KR`, mockResponse);

          const holidays = await getHolidaysForYear('KR', 2024);
          expect(holidays).to.deep.equal(mockResponse);
      });

      it('should throw an error if the request fails', async () => {
        fetchMock.get(`${API_URL}/PublicHolidays/2024/KR`, 500);

        try {
            await getHolidaysForYear('KR', 2024);
        } catch (error) {
            expect(error.message).to.equal('Error: Error: 500');
        }
    });
  });

  describe('getNextPublicHolidays', () => {
      it('should return a list of next public holidays for a given country code', async () => {
          const mockResponse = [
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-08-15',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '광복절',
                  name: 'Liberation Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-16',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-17',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-09-18',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '추석',
                  name: 'Chuseok',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-10-03',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '개천절',
                  name: 'National Foundation Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-10-09',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '한글날',
                  name: 'Hangul Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2024-12-25',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '크리스마스',
                  name: 'Christmas Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-01-01',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '새해',
                  name: 'New Year\'s Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-01-28',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-01-29',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-01-30',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '설날',
                  name: 'Lunar New Year',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-03-01',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '3·1절',
                  name: 'Independence Movement Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-05-05',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '어린이날',
                  name: 'Children\'s Day',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-05-05',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '부처님 오신 날',
                  name: 'Buddha\'s Birthday',
                  types: ['Public']
              },
              {
                  counties: null,
                  countryCode: 'KR',
                  date: '2025-06-06',
                  fixed: false,
                  global: true,
                  launchYear: null,
                  localName: '현충일',
                  name: 'Memorial Day',
                  types: ['Public']
              }
          ];

          fetchMock.get(`${API_URL}/NextPublicHolidays/KR`, mockResponse);

          const holidays = await getNextPublicHolidays('KR');
          expect(holidays).to.deep.equal(mockResponse);
      });

      it('should throw an error if the request fails', async () => {
        fetchMock.get(`${API_URL}/NextPublicHolidays/KR`, 500);

        try {
            await getNextPublicHolidays('KR');
        } catch (error) {
            expect(error.message).to.equal('Error: Error: 500');
        }
    });
  });

  describe('printHolidays', () => {
      it('should print holidays to the console', () => {
          const holidays = [{ date: '2024-01-01', localName: 'New Year', name: 'New Year\'s Day' }];
          const consoleSpy = sinon.spy(console, 'log');

          printHolidays(holidays);
          expect(consoleSpy.calledWith('2024-01-01 New Year New Year\'s Day')).to.be.true;

          consoleSpy.restore();
      });
  });
});