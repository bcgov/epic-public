import api from "services/api";
import { parseFilters, parseTableParams } from "services/utils";

export const apiConfig = {
	url:
		process.env.REACT_APP_API ||
		localStorage.getItem("from_public_server--remote_api_path") ||
		"http://localhost:3000/api/public",
};

export const getDocuments = (keywords, filters, tableParameters) => {
	return api.get(
		apiConfig,
		`/search?dataset=Document&keywords=${keywords}&projectLegislation=default&populate=true&and[documentSource]=PROJECT&fuzzy=true${parseTableParams(
			tableParameters,
		)}${parseFilters(filters)}`,
	);
};

export const getLists = () => {
	return api.get(apiConfig, `/search?dataset=List&pageSize=1000`);
};

export const getOrganizations = (type) => {
	return api.get(apiConfig, `/organization?companyType=${type}&sortBy=+name&fields=name`);
};

export const getPcps = (keywords, filters, tableParameters) => {
	return api.get(
		apiConfig,
		`/search?dataset=CommentPeriod&keywords=${keywords}&populate=true&fuzzy=true${parseTableParams(
			tableParameters,
		)}${parseFilters(filters)}`,
	);
};

export const getProjects = (keywords, filters, tableParameters) => {
	return api.get(
		apiConfig,
		`/search?dataset=Project&keywords=${keywords}&projectLegislation=default&populate=true&fuzzy=true${parseTableParams(
			tableParameters,
		)}${parseFilters(filters)}`,
	);
};

export const getRecentActivity = () => {
	return api.get(apiConfig, `/recentActivity?top=true`);
};

export const getUpdates = (keywords, filters, tableParameters) => {
	return api.get(
		apiConfig,
		`/search?dataset=RecentActivity&keywords=${keywords}&projectLegislation=default&populate=true&fuzzy=true${parseTableParams(
			tableParameters,
		)}${parseFilters(filters)}`,
	);
};
