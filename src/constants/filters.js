export const FILTER_KEYS = {
	DOCUMENT_DATE_RANGE: "documentDateRange",
	DOCUMENT_AUTHORS: "documentAuthors",
	DOCUMENT_PROJECT_PHASES: "documentProjectPhases",
	DOCUMENT_TYPES: "documentTypes",
	PCP_DATE_RANGE: "pcpDateRange",
	PCP_PROJECT_PHASES: "pcpProjectPhases",
	PCP_RECENT: "pcpRecent",
	PROJECT_PHASES: "projectPhases",
	PROJECT_REGIONS: "projectRegions",
	PROJECT_TYPES: "projectTypes",
	PROPONENTS: "proponents",
	STATUS: "status",
	UPDATE_TYPES: "updateTypes",
};
export const LIST_TYPE_FILTER_KEYS = {
	[FILTER_KEYS.DOCUMENT_AUTHORS]: "author",
	[FILTER_KEYS.DOCUMENT_PROJECT_PHASES]: "projectPhase",
	[FILTER_KEYS.DOCUMENT_TYPES]: "doctype",
	[FILTER_KEYS.PROJECT_PHASES]: "projectPhase",
};
export const API_FILTER_KEYS = {
	[FILTER_KEYS.DOCUMENT_DATE_RANGE]: { isDateRange: true, apiKeys: ["datePostedStart", "datePostedEnd"] },
	[FILTER_KEYS.DOCUMENT_AUTHORS]: "documentAuthorType",
	[FILTER_KEYS.DOCUMENT_PROJECT_PHASES]: "projectPhase",
	[FILTER_KEYS.DOCUMENT_TYPES]: "type",
	[FILTER_KEYS.PCP_DATE_RANGE]: { isDateRange: true, apiKeys: ["dateCompletedStart", "dateStartedEnd"] },
	[FILTER_KEYS.PCP_RECENT]: "dateCompletedStart",
	[FILTER_KEYS.PCP_PROJECT_PHASES]: "phaseName",
	[FILTER_KEYS.PROJECT_PHASES]: "currentPhaseName",
	[FILTER_KEYS.PROJECT_REGIONS]: "region",
	[FILTER_KEYS.PROJECT_TYPES]: "type",
	[FILTER_KEYS.PROPONENTS]: "proponent",
	[FILTER_KEYS.STATUS]: "status",
	[FILTER_KEYS.UPDATE_TYPES]: "updateTypes",
};
export const DOCUMENT_AUTHOR_MAP = {
	EAO: ["EAO"],
	FIRST_NATIONS: [
		"Indigenous Group",
		"Participating Indigenous Nation",
		"Indigenous Nation",
		"Dispute Resolution Facilitator",
	],
	OTHER: ["Other", "Local Government", "Impact Assessment Agency Canada"],
	PROPONENT_CERTIFICATE_HOLDER: ["Proponent/Certificate Holder", "Proponent / Certificate Holder"],
	PUBLIC: ["Public", "Community Advisory Committee"],
	WORKING_GROUPS: ["Technical Advisory Committee", "Working Group"],
};
// filter options
export const DATE_RANGE = [{ description: "Date", key: "date" }];
export const DOCUMENT_AUTHORS = [
	{ description: "EAO", map: DOCUMENT_AUTHOR_MAP.EAO },
	{ description: "First Nations", map: DOCUMENT_AUTHOR_MAP.FIRST_NATIONS },
	{ description: "Proponent/Certificate Holder", map: DOCUMENT_AUTHOR_MAP.PROPONENT_CERTIFICATE_HOLDER },
	{ description: "Public", map: DOCUMENT_AUTHOR_MAP.PUBLIC },
	{ description: "Working Groups/Technical Advisory Committee ", map: DOCUMENT_AUTHOR_MAP.WORKING_GROUPS },
	{ description: "Other", map: DOCUMENT_AUTHOR_MAP.OTHER },
];
export const PCP_PROJECT_PHASES = [
	{ description: "Decision", key: "Decision" },
	{ description: "Determination", key: "Determination" },
	{ description: "Evaluation", key: "Evaluation" },
	{ description: "Intake", key: "Intake" },
	{ description: "Post-Certification", key: "Post-Certification" },
	{ description: "Review", key: "Review" },
	{ description: "Scope", key: "Scope" },
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
export const PROJECT_TYPE_KEYS = {
	ENERGY_ELECTRICITY: "Energy-Electricity",
	ENERGY_PETROLEUM: "Energy-Petroleum & Natural Gas",
	FOOD_PROCESSING: "Food Processing",
	INDUSTRIAL: "Industrial",
	MINES: "Mines",
	OTHER: "Other",
	TOURIST_DESTINATION: "Tourist Destination Resorts",
	TRANSPORTATION: "Transportation",
	WASTE_DISPOSAL: "Waste Disposal",
	WATER_MANAGEMENT: "Water Management",
};
export const DOCUMENT_TYPES = [
	{ description: "Option 1", key: "1" },
	{ description: "Option 2", key: "2" },
	{ description: "Option 3", key: "3" },
];
export const PROJECT_TYPES = [
	{ description: "Energy-Electricity", key: PROJECT_TYPE_KEYS.ENERGY_ELECTRICITY },
	{ description: "Energy-Petroleum & Natural Gas", key: PROJECT_TYPE_KEYS.ENERGY_PETROLEUM },
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
	{ description: "Open", key: "open" },
	{ description: "Closed", key: "closed" },
	{ description: "Upcoming", key: "upcoming" },
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
