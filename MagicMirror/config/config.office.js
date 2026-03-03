// 민감한 데이터 및 설정 변수
const ENV = {
	CALENDAR_HOLIDAYS_URL: "https://p03-calendars.icloud.com/holidays/kr_ko.ics",
	CALENDAR_BUSINESS_URL: "https://xxx.ics",
	CALENDAR_BASIC_URL: "https://xxx.ics",
	HA_URL: "http://192.168.x.x:8123",
	HA_TOKEN: "token"
};

let config = {
	address: "0.0.0.0",
	port: 8080,
	basePath: "/",
	ipWhitelist: [],
	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",
	language: "ko",
	locale: "ko-KR",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",
	modules: [
		{
			module: "MMM-mmpm"
		},
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "lower_third"
		},
		{
			module: "clock",
			position: "top_right",
			config: {
				showDate: true,
				showTime: true,
				displaySeconds: false,
				timeFormat: 24,
				dateFormat: "M월 D일 dddd"
			}
		},
		{
			module: "calendar",
			position: "top_left",
			config: {
				colored: true,
				coloredSymbolOnly: true,
				maximumEntries: 5,
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
				fontSize: '16px',
				eventHeight: '18px',
				locale: 'ko-KR',
				firstDayOfWeek: 1,
				weekIndex: -1,
				weeksInView: 3,
				maxEventLines: 2,
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
		{
			module: 'MMM-Homeassistant',
			position: 'top_left',
			config: {
				url: ENV.HA_URL,
				updateInterval: 60000,
				title: "",
				token: ENV.HA_TOKEN,
				entities: [
					{
						id: "sensor.office_thermometer_temperature",
						name: "온도",
						icons: [{ "default": "thermometer" }]
					},
					{
						id: "sensor.office_thermometer_humidity",
						name: "습도",
						icons: [{ "default": "water" }]
					},
					{
						id: "sensor.esp_air_monitor_air_quality",
						name: "미세먼지",
						icons: [{ "default": "blur" }]
					}
				]
			}
		},
		{
			module: "MMM-DailyAlarm",
			position: "top_center",
			config: {
				alarms: [
					{ time: "09:00:00", showAt: "08:50:00", hideAt: "09:00:10", beforeText: "출근" },
					{ time: "11:00:00", showAt: "10:50:00", hideAt: "11:10:00", beforeText: "쉬는 시간" },
					{ time: "12:30:00", showAt: "12:25:00", hideAt: "13:30:00", beforeText: "점심 시간" },
					{ time: "13:30:00", showAt: "12:30:00", hideAt: "13:30:10", beforeText: "쉬는 시간" },
					{ time: "16:00:00", showAt: "15:50:00", hideAt: "16:10:10", beforeText: "쉬는 시간" },
					{ time: "18:00:00", showAt: "17:50:00", hideAt: "18:00:00", beforeText: "퇴근 시간" },
					{ time: "18:00:00", showAt: "18:00:00", hideAt: "18:30:00", beforeText: "저녁 시간" },
					{ time: "18:30:00", showAt: "18:30:00", hideAt: "00:00:00", beforeText: "야근중" },
				]
			}
		},
		{
			module: 'MMM-Webhook-Notification',
			position: 'fullscreen_above',
		}
	]
};

if (typeof module !== "undefined") { module.exports = config; }
