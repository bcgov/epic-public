import { getStatus } from "./pcp";

describe("getStatus tests", () => {
	const now = new Date();
	let tomorrow = new Date();
	tomorrow.setDate(now.getDate() + 1);
	let yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);

	test("should return 'Open' if the current date is between the start and end dates", () => {
		expect(getStatus(yesterday, tomorrow)).toBe("Open");
	});

	test("should return 'Closed' if the end date is in the past", () => {
		expect(getStatus(yesterday, yesterday)).toBe("Closed");
	});

	test("should return 'Upcoming' if the start date is in the future", () => {
		expect(getStatus(tomorrow, tomorrow)).toBe("Upcoming");
	});

	test("should return undefined if either the start or end date is not provided", () => {
		const status = getStatus(now);
		expect(status).toBeUndefined();
	});
});
