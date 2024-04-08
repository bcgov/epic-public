export const FILTER_KEYS = {
	DATE_RANGE: "dateRange",
	DOCUMENT_AUTHORS: "documentAuthors",
	DOCUMENT_TYPES: "documentTypes",
	PROJECT_PHASES: "projectPhases",
	PROJECT_REGIONS: "projectRegions",
	PROJECT_TYPES: "projectTypes",
	PROPONENTS: "proponents",
	STATUS: "status",
	UPDATE_TYPES: "updateTypes",
};
// filter options
export const DATE_RANGE = [{ description: "Date", key: "date" }];
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
export const PROJECT_PHASES = [
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
