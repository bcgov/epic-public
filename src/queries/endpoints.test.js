import { getDocuments, getLists, getOrganizations, getPcps, getProjects, getRecentActivity } from "./endpoints";

import * as api from "services/api";

jest.mock("services/api", () => ({
	get: jest.fn(),
}));

describe("endpoints tests", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getDocuments tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			const keywords = "search keywords";
			getDocuments(keywords, [], {});
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/search?dataset=Document&keywords=${keywords}&projectLegislation=default&populate=true&and[documentSource]=PROJECT&fuzzy=true`,
			);
		});
	});

	describe("getLists tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			getLists();
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/search?dataset=List&pageSize=1000`,
			);
		});
	});

	describe("getOrganizations tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			const type = "type";
			getOrganizations(type);
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/organization?companyType=${type}&sortBy=+name&fields=name`,
			);
		});
	});

	describe("getPcps tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			const keywords = "search keywords";
			getPcps(keywords, [], {});
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/search?dataset=CommentPeriod&keywords=${keywords}&populate=true&fuzzy=true`,
			);
		});
	});

	describe("getProjects tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			const keywords = "search keywords";
			getProjects(keywords, [], {});
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/search?dataset=Project&keywords=${keywords}&projectLegislation=default&populate=true&fuzzy=true`,
			);
		});
	});

	describe("getRecentActivity tests", () => {
		test("calls api.get with the correct URL and parameters", () => {
			getRecentActivity();
			expect(api.get).toHaveBeenCalledTimes(1);
			expect(api.get).toHaveBeenCalledWith(
				expect.objectContaining({ url: expect.stringContaining("/api/public") }),
				`/recentActivity?top=true`,
			);
		});
	});
});
