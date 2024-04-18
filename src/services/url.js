import { apiConfig } from "queries/endpoints";

export const encodeString = (filename, isUrl) => {
	if (isUrl) {
		return encodeURI(filename);
	} else {
		return encodeURIComponent(filename);
	}
};

export const getDocumentDownloadLink = (displayName, documentFileName, documentId, internalOriginalName) => {
	const filename = documentFileName || displayName || internalOriginalName;
	const encodedName = encodeString(filename, true);
	return `${apiConfig.url}/download/${documentId}/download/${encodedName}`;
};

export const getProjectPath = (projectId) => {
	return `/p/${projectId}/project-details`;
};
