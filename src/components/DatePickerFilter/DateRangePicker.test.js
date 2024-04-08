import { within } from "@testing-library/dom";
import { fireEvent, render, screen } from "@testing-library/react";

import DateRangePicker from "./DateRangePicker";

import { formatDateLongMonth } from "services/date";

describe("DateRangePicker tests", () => {
	const endDate = new Date(2023, 4, 15);
	const setEndDate = jest.fn();
	const setStartDate = jest.fn();
	const startDate = new Date(2023, 3, 1);

	describe("DateRangePicker rendering", () => {
		test("should render the component with a start and end date", () => {
			render(
				<DateRangePicker endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} startDate={startDate} />,
			);

			expect(screen.getByRole("grid", { name: "April 2023" })).toBeInTheDocument();
			expect(screen.getByRole("grid", { name: "May 2023" })).toBeInTheDocument();

			const dateRangeLabel = screen.getByLabelText("Date range label");
			expect(within(dateRangeLabel).getByText(formatDateLongMonth(startDate))).toBeInTheDocument();
			expect(within(dateRangeLabel).getByText(formatDateLongMonth(endDate))).toBeInTheDocument();
		});
	});

	describe("DateRangePicker functionality", () => {
		test("should update the start date when a new start date is selected", () => {
			render(
				<DateRangePicker endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} startDate={startDate} />,
			);

			const newStartDate = new Date(2023, 3, 16);
			const startRangeCalendar = screen.getByLabelText("Select start date");
			const newStartDateButton = within(startRangeCalendar).getByRole("gridcell", { name: newStartDate.getDate() });
			fireEvent.click(newStartDateButton);

			expect(setStartDate).toHaveBeenCalledWith(newStartDate);
		});

		test("should update the end date when a new end date is selected", () => {
			render(
				<DateRangePicker endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} startDate={startDate} />,
			);

			const newEndDate = new Date(2023, 4, 7);
			const endRangeCalendar = screen.getByLabelText("Select end date");
			const newEndDateButton = within(endRangeCalendar).getByRole("gridcell", { name: newEndDate.getDate() });
			fireEvent.click(newEndDateButton);

			expect(setEndDate).toHaveBeenCalledWith(newEndDate);
		});

		test("should highlight the selected date range correctly", () => {
			render(
				<DateRangePicker endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} startDate={startDate} />,
			);

			const startRangeCalendar = screen.getByLabelText("Select start date");
			const endRangeCalendar = screen.getByLabelText("Select end date");
			const allDateCells = [
				...within(startRangeCalendar).getAllByRole("gridcell"),
				...within(endRangeCalendar).getAllByRole("gridcell"),
			];
			allDateCells.forEach((cell) => {
				const cellTimestamp = parseInt(cell.getAttribute("data-timestamp"));
				const cellDate = new Date(cellTimestamp);

				if (cellDate >= startDate && cellDate <= endDate) {
					expect(cell).toHaveClass("inSelectedRange");
				} else {
					expect(cell).toHaveClass("outOfSelectedRange");
				}
			});
		});
	});
});
