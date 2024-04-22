import { encodeString, parseFilters, parseSortBy, parseTableParams } from "./utils";

import { API_FILTER_KEYS, FILTER_KEYS } from "constants/filters";

describe("utils tests", () => {
	describe("encodeString", () => {
		test("encodes URL when isUrl is true", () => {
			expect(encodeString("Hello World!", true)).toBe("Hello%20World!");
		});
	});

	describe("parseFilters tests", () => {
		test("returns an empty string when filters is empty", () => {
			expect(parseFilters([])).toBe("");
		});

		test("returns a string with the correct filter format", () => {
			const filters = [
				{ filterKey: FILTER_KEYS.DOCUMENT_TYPES, key: "value1" },
				{ filterKey: FILTER_KEYS.DOCUMENT_PROJECT_PHASES, key: "value2,value3" },
			];
			expect(parseFilters(filters)).toBe(
				`&and[${API_FILTER_KEYS[filters[0].filterKey]}]=${filters[0].key}&and[${
					API_FILTER_KEYS[filters[1].filterKey]
				}]=${filters[1].key.split(",")[0]}&and[${API_FILTER_KEYS[filters[1].filterKey]}]=${
					filters[1].key.split(",")[1]
				}`,
			);
		});
	});

	describe("parseSortBy tests", () => {
		test("should correctly parse sortBy with ascending order", () => {
			const tableColumn = "name";
			const direction = "asc";
			expect(parseSortBy(tableColumn, direction)).toEqual(`&sortBy=+${tableColumn}`);
		});

		test("should correctly parse sortBy with descending order", () => {
			const tableColumn = "name";
			const direction = "desc";
			expect(parseSortBy(tableColumn, direction)).toEqual(`&sortBy=-${tableColumn}`);
		});

		test("should return an empty string when tableColumn is empty", () => {
			const tableColumn = "";
			const direction = "asc";
			expect(parseSortBy(tableColumn, direction)).toEqual("");
		});
	});

	describe("parseTableParams tests", () => {
		test("returns an empty string when tableParameters is empty", () => {
			expect(parseTableParams({})).toBe("");
		});

		test("returns a string with the correct table parameters format", () => {
			const tableParameters = {
				pageSize: 10,
				page: 2,
				sortBy: { orderBy: "name", order: "asc" },
			};
			expect(parseTableParams(tableParameters)).toEqual(
				`&pageSize=${tableParameters.pageSize}&page=${tableParameters.page}&sortBy=+${tableParameters.sortBy.orderBy}`,
			);
		});

		test("returns a string with the correct table parameters if some parameters are missing", () => {
			const tableParameters = {
				pageSize: 10,
				page: 0,
			};
			expect(parseTableParams(tableParameters)).toEqual(
				`&pageSize=${tableParameters.pageSize}&page=${tableParameters.page}`,
			);
		});
	});
});
