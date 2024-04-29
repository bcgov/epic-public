import { apiConfig } from "queries/endpoints";

import { encodeString } from "./utils";

export const getDocumentDownloadLink = (displayName, documentFileName, documentId, internalOriginalName) => {
	const filename = documentFileName || displayName || internalOriginalName;
	const encodedName = encodeString(filename, true);
	return `${apiConfig.url}/download/${documentId}/download/${encodedName}`;
};

export const getPcpPath = (metURL, pcpId, projectId) => {
	return metURL ? metURL : `/p/${projectId}/cp/${pcpId}/details`;
};

export const getProjectPath = (projectId) => {
	return `/p/${projectId}/project-details`;
};
