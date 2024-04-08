import * as service from "./date";

const afterDate = new Date(2024, 2, 14);
const beforeDate = new Date(2024, 2, 10);
const testDate = new Date(2024, 2, 12);
const testString = "2024-03-12T08:00:00.000Z";

describe("Date service tests", () => {
	describe("addDays tests", () => {
		const days = 5;
		const expected = new Date(testDate);
		expected.setDate(testDate.getDate() + days);

		test("throws an error for an invalid first date", () => {
			expect(() => service.addDays("oops", days)).toThrow("date service: addDays: invalid date: oops");
		});

		test("returns a new date with the expected difference in days", () => {
			const result = service.addDays(testDate, days);

			expect(result).toEqual(expected);
		});
	});
	describe("formatDateOnlyISO tests", () => {
		const expected = "2024-03-12";

		test("throws an error for an invalid date", () => {
			expect(() => service.formatDateOnlyISO("oops")).toThrow("date service: formatDateOnlyISO: invalid date: oops");
		});

		test("returns a date as formatted string", () => {
			const result = service.formatDateOnlyISO(testDate);

			expect(result).toEqual(expected);
		});

		test("returns a date string as a formatted string", () => {
			const result = service.formatDateOnlyISO(testString);

			expect(result).toEqual(expected);
		});
	});

	describe("formatDateLongMonth tests", () => {
		const expected = "March 12, 2024";

		test("throws an error for an invalid date", () => {
			expect(() => service.formatDateLongMonth("oops")).toThrow(
				"date service: formatDateLongMonth: invalid date: oops",
			);
		});

		test("returns a date as formatted string", () => {
			const result = service.formatDateLongMonth(testDate);

			expect(result).toEqual(expected);
		});

		test("returns a date string as a formatted string", () => {
			const result = service.formatDateLongMonth(testString);

			expect(result).toEqual(expected);
		});
	});

	describe("formatDateShortMonth tests", () => {
		const expected = "Mar 12, 2024";

		test("throws an error for an invalid date", () => {
			expect(() => service.formatDateShortMonth("oops")).toThrow(
				"date service: formatDateShortMonth: invalid date: oops",
			);
		});

		test("returns a date as formatted string", () => {
			const result = service.formatDateShortMonth(testDate);

			expect(result).toEqual(expected);
		});

		test("returns a date string as a formatted string", () => {
			const result = service.formatDateShortMonth(testString);

			expect(result).toEqual(expected);
		});
	});

	describe("isAfterDate tests", () => {
		test("throws an error for an invalid first date", () => {
			expect(() => service.isAfterDate("oops", testDate)).toThrow("date service: isAfterDate: invalid date: oops");
		});

		test("throws an error for an invalid second date", () => {
			expect(() => service.isAfterDate(testDate, "oops")).toThrow("date service: isAfterDate: invalid date: oops");
		});

		test("returns true if the first date is after the second date", () => {
			const result = service.isAfterDate(afterDate, testDate);

			expect(result).toBe(true);
		});

		test("returns true if the first date is after the second date string", () => {
			const result = service.isAfterDate(afterDate, testString);

			expect(result).toBe(true);
		});

		test("returns false if the first date is before the second date", () => {
			const result = service.isAfterDate(beforeDate, testDate);

			expect(result).toBe(false);
		});

		test("returns false if the first date is equal to the second date", () => {
			const result = service.isAfterDate(testDate, testDate);

			expect(result).toBe(false);
		});
	});

	describe("isBetweenDates tests", () => {
		test("throws an error for an invalid first date", () => {
			expect(() => service.isBetweenDates("oops", beforeDate, afterDate)).toThrow(
				"date service: isBetweenDates: invalid date: oops",
			);
		});

		test("throws an error for an invalid second date", () => {
			expect(() => service.isBetweenDates(testDate, "oops", afterDate)).toThrow(
				"date service: isBetweenDates: invalid date: oops",
			);
		});

		test("throws an error for an invalid third date", () => {
			expect(() => service.isBetweenDates(testDate, beforeDate, "oops")).toThrow(
				"date service: isBetweenDates: invalid date: oops",
			);
		});

		test("returns true if the first date is between the second date and the third date", () => {
			const result = service.isBetweenDates(testDate, beforeDate, afterDate);

			expect(result).toBe(true);
		});

		test("returns true if the first date string is between the second date and the third date", () => {
			const result = service.isBetweenDates(testString, beforeDate, afterDate);

			expect(result).toBe(true);
		});

		test("returns false if the first date is before the second date", () => {
			const result = service.isBetweenDates(testDate, afterDate, afterDate);

			expect(result).toBe(false);
		});

		test("returns false if the first date is after the third date", () => {
			const result = service.isBetweenDates(testDate, beforeDate, beforeDate);

			expect(result).toBe(false);
		});

		test("returns true if the first date is equal to second and the third dates", () => {
			const result = service.isBetweenDates(testDate, testDate, testDate);

			expect(result).toBe(true);
		});
	});

	describe("isValidDate tests", () => {
		test("returns false if argument is not a valid date", () => {
			const result = service.isValidDate("oops");

			expect(result).toEqual(false);
		});

		test("returns false if argument is a date string", () => {
			const result = service.isValidDate(testString);

			expect(result).toEqual(false);
		});

		test("returns true if argument is a valid date", () => {
			const result = service.isValidDate(testDate);

			expect(result).toEqual(true);
		});
	});

	describe("subtractDays tests", () => {
		const days = 5;
		const expected = new Date(testDate);
		expected.setDate(testDate.getDate() - days);

		test("throws an error for an invalid first date", () => {
			expect(() => service.subtractDays("oops", days)).toThrow("date service: subtractDays: invalid date: oops");
		});

		test("returns a new date with the expected difference in days", () => {
			const result = service.subtractDays(testDate, days);

			expect(result).toEqual(expected);
		});
	});
});
