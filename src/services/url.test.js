import { apiConfig } from "queries/endpoints";

import { encodeString, getDocumentDownloadLink, getProjectPath } from "./url";

describe("Url services test", () => {
	describe("encodeString", () => {
		test("encodes URL when isUrl is true", () => {
			expect(encodeString("Hello World!", true)).toBe("Hello%20World!");
		});
	});

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

	describe("getProjectPath tests", () => {
		test("returns a valid project path", () => {
			const projectId = "12345";
			const result = getProjectPath(projectId);
			expect(result).toBe(`/p/${projectId}/project-details`);
		});
	});
});
