/*
 * The list of timezones supported by FE is given by the function listTimezones(),
 * which returns the timezones in the 2019c iana database. That database is backward-compatible
 * (the list of timezones keeps changing because humans keep making crazy irrational decisions).
 * The API does not like backward-compatibility though, and they only support some of those
 * timezones (loosely based on https://www.php.net/manual/en/timezones.php). The list of timezones
 * recognized by FE but not supported by BE are the ones that serve as entries for the object below.
 * The value for each entry is the supported timezone we will re-direct to
 */
export const unsupportedTimezoneLinks: { [key: string]: string } = {
    'America/Fort_Wayne': 'America/New_York',
    'Asia/Rangoon': 'Asia/Yangon',
    CET: 'Europe/Paris',
    CST6CDT: 'America/Chicago',
    EET: 'Europe/Istanbul',
    EST: 'America/New_York',
    EST5EDT: 'America/New_York',
    'Etc/GMT+1': 'Atlantic/Cape_Verde',
    'Etc/GMT+10': 'Pacific/Tahiti',
    'Etc/GMT+11': 'Pacific/Niue',
    'Etc/GMT+12': 'Pacific/Niue', // no canonical timezone exists for GMT+12
    'Etc/GMT+2': 'America/Noronha',
    'Etc/GMT+3': 'America/Sao_Paulo',
    'Etc/GMT+4': 'America/Caracas',
    'Etc/GMT+5': 'America/Lima',
    'Etc/GMT+6': 'America/Managua',
    'Etc/GMT+7': 'America/Phoenix',
    'Etc/GMT+8': 'Pacific/Pitcairn',
    'Etc/GMT+9': 'Pacific/Gambier',
    'Etc/GMT-0': 'Europe/London',
    'Etc/GMT-1': 'Europe/Paris',
    'Etc/GMT-10': 'Australia/Brisbane',
    'Etc/GMT-11': 'Australia/Sydney',
    'Etc/GMT-12': 'Pacific/Auckland',
    'Etc/GMT-13': 'Pacific/Fakaofo',
    'Etc/GMT-14': 'Pacific/Kiritimati',
    'Etc/GMT-2': 'Africa/Cairo',
    'Etc/GMT-3': 'Asia/Baghdad',
    'Etc/GMT-4': 'Asia/Dubai',
    'Etc/GMT-5': 'Asia/Tashkent',
    'Etc/GMT-6': 'Asia/Dhaka',
    'Etc/GMT-7': 'Asia/Jakarta',
    'Etc/GMT-8': 'Asia/Shanghai',
    'Etc/GMT-9': 'Asia/Tokyo',
    'Etc/UTC': 'Europe/London',
    HST: 'Pacific/Honolulu',
    MET: 'Europe/Paris',
    MST: 'Europe/Paris',
    MST7MDT: 'America/Denver',
    PST8PDT: 'America/Los_Angeles',
    WET: 'Europe/Lisbon'
};

export const OUTLOOK_TIMEZONE_LINKS: { [key: string]: string } = {
    'Dateline Standard Time': 'Pacific/Niue', // no canonical timezone exists for GMT+12
    'Samoa Standard Time': 'Pacific/Midway',
    'Hawaiian Standard Time': 'Pacific/Honolulu',
    'Alaskan Standard Time': 'America/Anchorage',
    'Pacific Standard Time': 'America/Los_Angeles',
    'Mountain Standard Time': 'America/Denver',
    'Mexico Standard Time 2': 'America/La_Paz',
    'U.S. Mountain Standard Time': 'America/Phoenix',
    'Central Standard Time': 'America/Mexico_City',
    'Canada Central Standard Time': 'America/Regina',
    'Mexico Standard Time': 'America/Mexico_City',
    'Central America Standard Time': 'America/Mexico_City',
    'Eastern Standard Time': 'America/New_York',
    'U.S. Eastern Standard Time': 'America/New_York',
    'S.A. Pacific Standard Time': 'America/Bogota',
    'Atlantic Standard Time': 'America/Halifax',
    'S.A. Western Standard Time': 'America/La_Paz',
    'Pacific S.A. Standard Time': 'America/Santiago',
    'Newfoundland and Labrador Standard Time': 'America/St_Johns',
    'E. South America Standard Time': 'America/Sao_Paulo',
    'S.A. Eastern Standard Time': 'America/Sao_Paulo',
    'Greenland Standard Time': 'America/Godthab',
    'Mid-Atlantic Standard Time': 'Atlantic/Cape_Verde',
    'Azores Standard Time': 'Atlantic/Azores',
    'Cape Verde Standard Time': 'Atlantic/Cape_Verde',
    'GMT Standard Time': 'UTC',
    'Greenwich Standard Time': 'Atlantic/Reykjavik',
    'Central Europe Standard Time': 'Europe/Budapest',
    'Central European Standard Time': 'Europe/Warsaw',
    'Romance Standard Time': 'Europe/Paris',
    'W. Europe Standard Time': 'Europe/Berlin',
    'W. Central Africa Standard Time': 'Africa/Algiers',
    'E. Europe Standard Time': 'Europe/Minsk',
    'Egypt Standard Time': 'Africa/Cairo',
    'FLE Standard Time': 'Europe/Helsinki',
    'GTB Standard Time': 'Europe/Athens',
    'Israel Standard Time': 'Asia/Jerusalem',
    'South Africa Standard Time': 'Africa/Harare',
    'Russian Standard Time': 'Europe/Moscow',
    'Arab Standard Time': 'Asia/Kuwait',
    'E. Africa Standard Time': 'Africa/Nairobi',
    'Arabic Standard Time': 'Asia/Baghdad',
    'Iran Standard Time': 'Asia/Tehran',
    'Arabian Standard Time': 'Asia/Muscat',
    'Caucasus Standard Time': 'Asia/Baku',
    'Transitional Islamic State of Afghanistan Standard Time': 'Asia/Kabul',
    'Ekaterinburg Standard Time': 'Asia/Yekaterinburg',
    'West Asia Standard Time': 'Asia/Tashkent',
    'India Standard Time': 'Asia/Kolkata',
    'Nepal Standard Time': 'Asia/Kathmandu',
    'Central Asia Standard Time': 'Asia/Dhaka',
    'Sri Lanka Standard Time': 'Asia/Colombo',
    'N. Central Asia Standard Time': 'Asia/Novosibirsk',
    'Myanmar Standard Time': 'Asia/Yangon',
    'S.E. Asia Standard Time': 'Asia/Bangkok',
    'North Asia Standard Time': 'Asia/Krasnoyarsk',
    'China Standard Time': 'Asia/Hong_Kong',
    'Singapore Standard Time': 'Asia/Singapore',
    'Taipei Standard Time': 'Asia/Taipei',
    'W. Australia Standard Time': 'Australia/Perth',
    'North Asia East Standard Time': 'Asia/Irkutsk',
    'Korea Standard Time': 'Asia/Seoul',
    'Tokyo Standard Time': 'Asia/Tokyo',
    'Yakutsk Standard Time': 'Asia/Yakutsk',
    'A.U.S. Central Standard Time': 'Australia/Darwin',
    'Cen. Australia Standard Time': 'Australia/Adelaide',
    'A.U.S. Eastern Standard Time': 'Australia/Melbourne',
    'E. Australia Standard Time': 'Australia/Brisbane',
    'Tasmania Standard Time': 'Australia/Hobart',
    'Vladivostok Standard Time': 'Asia/Vladivostok',
    'West Pacific Standard Time': 'Pacific/Guam',
    'Central Pacific Standard Time': 'Asia/Magadan',
    'Fiji Islands Standard Time': 'Pacific/Fiji',
    'New Zealand Standard Time': 'Pacific/Auckland',
    'Tonga Standard Time': 'Pacific/Tongatapu',
    'Azerbaijan Standard Time': 'Asia/Baku',
    'Middle East Standard Time': 'Asia/Beirut',
    'Jordan Standard Time': 'Asia/Amman',
    'Central Standard Time (Mexico)': 'America/Mexico_City',
    'Mountain Standard Time (Mexico)': 'America/La_Paz',
    'Pacific Standard Time (Mexico)': 'America/Tijuana',
    'Namibia Standard Time': 'Africa/Windhoek',
    'Georgian Standard Time': 'Asia/Tbilisi',
    'Central Brazilian Standard Time': 'America/Manaus',
    'Montevideo Standard Time': 'America/Montevideo',
    'Armenian Standard Time': 'Asia/Yerevan',
    'Venezuela Standard Time': 'America/Caracas',
    'Argentina Standard Time': 'America/Argentina/Buenos_Aires',
    'Morocco Standard Time': 'Africa/Casablanca',
    'Pakistan Standard Time': 'Asia/Karachi',
    'Mauritius Standard Time': 'Indian/Mauritius',
    'Paraguay Standard Time': 'America/Asuncion',
    'Kamchatka Standard Time': 'Asia/Kamchatka'
};
