import { apiConfig } from "queries/endpoints";

import { getDocumentDownloadLink, getPcpPath, getProjectPath } from "./navigation";
import { encodeString } from "./utils";

describe("Url services test", () => {
	describe("getDocumentDownloadLink tests", () => {
		test("returns a valid download link", () => {
			const displayName = "Document 1";
			const documentFileName = "document 1.pdf";
			const documentId = "1";
			const internalOriginalName = "document_1.pdf";

			const result = getDocumentDownloadLink(displayName, documentFileName, documentId, internalOriginalName);
			expect(result).toBe(`${apiConfig.url}/download/${documentId}/download/${encodeString(documentFileName)}`);
		});
	});

	describe("getPcpPath tests", () => {
		const projectId = "12345";
		const pcpId = "678";

		test("returns a valid non-MET pcp path", () => {
			const metUrl = "";
			expect(getPcpPath(metUrl, pcpId, projectId)).toBe(`/p/${projectId}/cp/${pcpId}/details`);
		});
		test("returns the meturl for MET pcp", () => {
			const metUrl = "https://eagle-dev.apps.silver.devops.gov.bc.ca";
			expect(getPcpPath(metUrl, pcpId, projectId)).toBe(metUrl);
		});
	});

	describe("getProjectPath tests", () => {
		test("returns a valid project path", () => {
			const projectId = "12345";
			expect(getProjectPath(projectId)).toBe(`/p/${projectId}/project-details`);
		});
	});
});
