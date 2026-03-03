// 민감한 데이터 및 설정 변수
const ENV = {
	CALENDAR_HOLIDAYS_URL: "https://p03-calendars.icloud.com/holidays/kr_ko.ics",
	CALENDAR_BUSINESS_URL: "https://xxx.ics",
	CALENDAR_BASIC_URL: "https://xxx.ics",
	HA_URL: "http://192.168.x.x:8123",
	HA_TOKEN: "token"
};

let config = {
	address: "localhost",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "ko",
	locale: "ko-KR",   // this variable is provided as a consistent location
	// it is currently only used by 3rd party modules. no MagicMirror code uses this value
	// as we have no usage, we  have no constraints on what this field holds
	// see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	//top_bar, top_left, top_center, top_right, upper_third, middle_center, lower_third, bottom_left, bottom_center, bottom_right, bottom_bar, fullscreen_above, and fullscreen_below
	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_bar",
			config: {
				showDate: true,
				showTime: false,
				displaySeconds: false,
				timeFormat: 24,
				dateFormat: "Y년 M월 D일, dddd"
			}
		},
		{
			module: "clock",
			position: "lower_third",
			config: {
				showDate: false,
				showTime: true,
				displaySeconds: false,
				timeFormat: 24,
			}
		},
		{
			module: "calendar",
			position: "top_right",
			config: {
				colored: true,
				coloredSymbolOnly: true,
				maximumEntries: 4,
				tableClass: "small",
				broadcastPastEvents: true,
				calendars: [
					{
						color: "#5B5AFF",
						symbol: "briefcase",
						url: ENV.CALENDAR_BUSINESS_URL,
						name: "business",
					},
					{
						color: "#882244",
						symbol: "flag",
						url: ENV.CALENDAR_HOLIDAYS_URL,
						name: "holidays",
					},
					{
						color: "#77FF70",
						symbol: "check",
						url: ENV.CALENDAR_BASIC_URL,
						name: "basic",
					}
				]
			}
		},
		{
			module: "MMM-CalendarExt3",
			position: "top_bar",
			config: {
				mode: "week",
				// fontSize: '16px',
				// eventHeight: '18px',
				locale: 'ko-KR',
				firstDayOfWeek: 1,
				weekIndex: -1,
				weeksInView: 3,
				maxEventLines: 4,
				calendarSet: ['holidays', 'basic', 'business'],
			},
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "연합뉴스",
						url: "http://www.yonhapnewstv.co.kr/browse/feed/",
					},
				]
			}
		},

	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
