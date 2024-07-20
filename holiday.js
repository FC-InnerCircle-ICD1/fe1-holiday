const API_BASE_URL = 'https://date.nager.at/api/v3';

function isValidCountryCode(countryCode) {
  const COUNTRY_CODES = [
    'AF',
    'AX',
    'AL',
    'DZ',
    'AS',
    'AD',
    'AO',
    'AI',
    'AQ',
    'AG',
    'AR',
    'AM',
    'AW',
    'AU',
    'AT',
    'AZ',
    'BS',
    'BH',
    'BD',
    'BB',
    'BY',
    'BE',
    'BZ',
    'BJ',
    'BM',
    'BT',
    'BO',
    'BQ',
    'BA',
    'BW',
    'BV',
    'BR',
    'IO',
    'BN',
    'BG',
    'BF',
    'BI',
    'CV',
    'KH',
    'CM',
    'CA',
    'KY',
    'CF',
    'TD',
    'CL',
    'CN',
    'CX',
    'CC',
    'CO',
    'KM',
    'CD',
    'CG',
    'CK',
    'CR',
    'CI',
    'HR',
    'CU',
    'CW',
    'CY',
    'CZ',
    'DK',
    'DJ',
    'DM',
    'DO',
    'EC',
    'EG',
    'SV',
    'GQ',
    'ER',
    'EE',
    'SZ',
    'ET',
    'FK',
    'FO',
    'FJ',
    'FI',
    'FR',
    'GF',
    'PF',
    'TF',
    'GA',
    'GM',
    'GE',
    'DE',
    'GH',
    'GI',
    'GR',
    'GL',
    'GD',
    'GP',
    'GU',
    'GT',
    'GG',
    'GN',
    'GW',
    'GY',
    'HT',
    'HM',
    'VA',
    'HN',
    'HK',
    'HU',
    'IS',
    'IN',
    'ID',
    'IR',
    'IQ',
    'IE',
    'IM',
    'IL',
    'IT',
    'JM',
    'JP',
    'JE',
    'JO',
    'KZ',
    'KE',
    'KI',
    'KP',
    'KR',
    'KW',
    'KG',
    'LA',
    'LV',
    'LB',
    'LS',
    'LR',
    'LY',
    'LI',
    'LT',
    'LU',
    'MO',
    'MG',
    'MW',
    'MY',
    'MV',
    'ML',
    'MT',
    'MH',
    'MQ',
    'MR',
    'MU',
    'YT',
    'MX',
    'FM',
    'MD',
    'MC',
    'MN',
    'ME',
    'MS',
    'MA',
    'MZ',
    'MM',
    'NA',
    'NR',
    'NP',
    'NL',
    'NC',
    'NZ',
    'NI',
    'NE',
    'NG',
    'NU',
    'NF',
    'MK',
    'MP',
    'NO',
    'OM',
    'PK',
    'PW',
    'PS',
    'PA',
    'PG',
    'PY',
    'PE',
    'PH',
    'PN',
    'PL',
    'PT',
    'PR',
    'QA',
    'RE',
    'RO',
    'RU',
    'RW',
    'BL',
    'SH',
    'KN',
    'LC',
    'MF',
    'PM',
    'VC',
    'WS',
    'SM',
    'ST',
    'SA',
    'SN',
    'RS',
    'SC',
    'SL',
    'SG',
    'SX',
    'SK',
    'SI',
    'SB',
    'SO',
    'ZA',
    'GS',
    'SS',
    'ES',
    'LK',
    'SD',
    'SR',
    'SJ',
    'SE',
    'CH',
    'SY',
    'TW',
    'TJ',
    'TZ',
    'TH',
    'TL',
    'TG',
    'TK',
    'TO',
    'TT',
    'TN',
    'TR',
    'TM',
    'TC',
    'TV',
    'UG',
    'UA',
    'AE',
    'GB',
    'US',
    'UM',
    'UY',
    'UZ',
    'VU',
    'VE',
    'VN',
    'VG',
    'VI',
    'WF',
    'EH',
    'YE',
    'ZM',
    'ZW',
  ];

  return COUNTRY_CODES.includes(countryCode);
}

function formatHoliday(holidays) {
  let holidayText = '';

  holidays.forEach(({ date, localName, name }) => {
    holidayText += `${date} ${localName} ${name}\n`;
  });

  return holidayText;
}

function handleHolidayApiError(response) {
  if (response.ok === false) {
    if (response.status === 404) {
      console.error('Wrong country code');
      process.exit();
    }

    throw new Error(response.statusText);
  }
}

async function searchHoliday(countryCode, year) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`
    );

    handleHolidayApiError(response);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('error =', error);
  }
}

async function searchNextHoliday(countryCode) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/NextPublicHolidays/${countryCode}`
    );

    handleHolidayApiError(response);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('error =', error);
  }
}

async function execute() {
  const [, , countryCode, year] = process.argv;

  if (!countryCode || !year) {
    console.error(
      '프로그램이 종료됩니다. 이유: 충분한 인수가 전달되지 않았습니다.'
    );
    process.exit();
  }

  if (!isValidCountryCode(countryCode)) {
    console.error('Wrong country code');
    process.exit();
  }

  let holidays;

  if (year === 'next') {
    holidays = await searchNextHoliday(countryCode);
  } else {
    holidays = await searchHoliday(countryCode, year);
  }

  console.log(formatHoliday(holidays));
}

execute();
