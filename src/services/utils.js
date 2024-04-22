import { API_FILTER_KEYS } from "constants/filters";

export const encodeString = (filename, isUrl) => {
	if (isUrl) {
		return encodeURI(filename);
	} else {
		return encodeURIComponent(filename);
	}
};

export const parseFilters = (filters) => {
	let filterAsString = ``;
	filters.forEach((filter) => {
		const apiFilterKey = API_FILTER_KEYS[filter.filterKey];
		filter.key.split(",").forEach((value) => (filterAsString += `&and[${apiFilterKey}]=${value}`));
	});
	return filterAsString;
};

export const parseSortBy = (tableColumn, direction) => {
	if (tableColumn === "") {
		return "";
	}
	if (direction === "asc") {
		return `&sortBy=+${tableColumn}`;
	} else {
		return `&sortBy=-${tableColumn}`;
	}
};

export const parseTableParams = (tableParameters) => {
	let paramsAsString = ``;
	Object.keys(tableParameters).forEach((key) => {
		if (tableParameters[key] !== null && tableParameters[key] !== undefined) {
			if (key === "sortBy") {
				paramsAsString += parseSortBy(tableParameters[key].orderBy, tableParameters[key].order);
			} else {
				paramsAsString += `&${key}=${tableParameters[key]}`;
			}
		}
	});
	return paramsAsString;
};
