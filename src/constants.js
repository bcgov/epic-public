export const FILTER_KEYS = {
	DATE_RANGE: "dateRange",
	DOCUMENT_AUTHORS: "documentAuthors",
	DOCUMENT_PROJECT_PHASES: "documentProjectPhases",
	DOCUMENT_TYPES: "documentTypes",
	PROJECT_PHASES: "projectPhases",
	PROJECT_REGIONS: "projectRegions",
	PROJECT_TYPES: "projectTypes",
	PROPONENTS: "proponents",
	STATUS: "status",
	UPDATE_TYPES: "updateTypes",
};
export const API_FILTER_KEYS = {
	[FILTER_KEYS.DATE_RANGE]: "dateRange",
	[FILTER_KEYS.DOCUMENT_AUTHORS]: "documentAuthorType",
	[FILTER_KEYS.DOCUMENT_PROJECT_PHASES]: "projectPhase",
	[FILTER_KEYS.DOCUMENT_TYPES]: "type",
	[FILTER_KEYS.PROJECT_PHASES]: "currentPhaseName",
	[FILTER_KEYS.PROJECT_REGIONS]: "projectRegions",
	[FILTER_KEYS.PROJECT_TYPES]: "type",
	[FILTER_KEYS.PROPONENTS]: "proponents",
	[FILTER_KEYS.STATUS]: "status",
	[FILTER_KEYS.UPDATE_TYPES]: "updateTypes",
};
export const HOME_TAB_KEYS = {
	PROJECTS: 0,
	DOCUMENTS: 1,
	PUBLIC_COMMENT_PERIODS: 2,
	UPDATES: 3,
	MAP: 4,
};
export const PROJECT_TYPE_KEYS = {
	ENERGY_ELECTRICITY: "Energy-Electricity",
	ENERGY_PATROLIUM: "Energy-Petroleum & Natural Gas",
	FOOD_PROCESSING: "Food Processing",
	INDUSTRIAL: "Industrial",
	MINES: "Mines",
	OTHER: "Other",
	TOURIST_DESTINATION: "Tourist Destination Resorts",
	TRANSPORTATION: "Transportation",
	WASTE_DISPOSAL: "Waste Disposal",
	WATER_MANAGEMENT: "Water Management",
};

export const HOME_TABS = [
	{
		filters: [
			FILTER_KEYS.PROJECT_TYPES,
			FILTER_KEYS.PROJECT_REGIONS,
			FILTER_KEYS.PROPONENTS,
			FILTER_KEYS.PROJECT_PHASES,
		],
		key: HOME_TAB_KEYS.PROJECTS,
		name: "Search Projects",
	},
	{
		filters: [
			FILTER_KEYS.DOCUMENT_TYPES,
			FILTER_KEYS.DOCUMENT_AUTHORS,
			FILTER_KEYS.DATE_RANGE,
			FILTER_KEYS.PROJECT_PHASES,
		],
		key: HOME_TAB_KEYS.DOCUMENTS,
		name: "Search Documents",
	},
	{
		filters: [FILTER_KEYS.DATE_RANGE, FILTER_KEYS.PROJECT_PHASES, FILTER_KEYS.STATUS],
		key: HOME_TAB_KEYS.PUBLIC_COMMENT_PERIODS,
		name: "Public Comment Periods",
	},
	{
		filters: [FILTER_KEYS.DATE_RANGE, FILTER_KEYS.PROJECT_PHASES, FILTER_KEYS.UPDATE_TYPES],
		key: HOME_TAB_KEYS.UPDATES,
		name: "Updates",
	},
	{
		filters: [
			FILTER_KEYS.PROJECT_TYPES,
			FILTER_KEYS.PROJECT_REGIONS,
			FILTER_KEYS.PROPONENTS,
			FILTER_KEYS.PROJECT_PHASES,
		],
		key: HOME_TAB_KEYS.MAP,
		name: "View Map",
	},
];
// Filter options
export const DATE_RANGE = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];
export const DOCUMENT_AUTHORS = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];
export const DOCUMENT_TYPES = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];

export const PROJECT_REGIONS = [
	{ description: "Cariboo", key: "Cariboo" },
	{ description: "Kootenay", key: "Kootenay" },
	{ description: "Lower Mainland", key: "Lower Mainland" },
	{ description: "Okanagan", key: "Okanagan" },
	{ description: "Omineca", key: "Omineca" },
	{ description: "Peace", key: "Peace" },
	{ description: "Skeena", key: "Skeena" },
	{ description: "Thompson-Nicola", key: "Thompson-Nicola" },
	{ description: "Vancouver Island", key: "Vancouver Island" },
];
export const PROJECT_TYPES = [
	{ description: "Energy-Electricity", key: PROJECT_TYPE_KEYS.ENERGY_ELECTRICITY },
	{ description: "Energy-Petroleum & Natural Gas", key: PROJECT_TYPE_KEYS.ENERGY_PATROLIUM },
	{ description: "Food Processing", key: PROJECT_TYPE_KEYS.FOOD_PROCESSING },
	{ description: "Industrial", key: PROJECT_TYPE_KEYS.INDUSTRIAL },
	{ description: "Mines", key: PROJECT_TYPE_KEYS.MINES },
	{ description: "Other", key: PROJECT_TYPE_KEYS.OTHER },
	{ description: "Tourist Destination Resorts", key: PROJECT_TYPE_KEYS.TOURIST_DESTINATION },
	{ description: "Transportation", key: PROJECT_TYPE_KEYS.TRANSPORTATION },
	{ description: "Waste Disposal", key: PROJECT_TYPE_KEYS.WASTE_DISPOSAL },
	{ description: "Water Management", key: PROJECT_TYPE_KEYS.WATER_MANAGEMENT },
];
export const STATUSES = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];

export const UPDATE_TYPES = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];

export const TABLE_DEFAULTS = {
	DEFAULT_PAGE_SIZE: 10,
	DEFAULT_CURRENT_PAGE: 0,
	DEFAULT_ROWS_PER_PAGE: [10, 25, 50, 100, { value: -1, label: "All" }],
	DEFAULT_SORT: {
		DEFAULT_ORDER: "desc",
		DEFAULT_ORDER_BY: "score",
	},
};

export const PROJECT_LEGISLATION_YEARS = [
	{ description: 2002, key: "legislation_2002" },
	{ description: 2018, key: "legislation_2018" },
];
