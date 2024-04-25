import { render, screen } from "@testing-library/react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import RangeDay from "./RangeDay";

describe("RangeDay tests", () => {
	const mockProps = {
		day: null,
		endDate: new Date(2023, 3, 29),
		isFirstVisibleCell: false,
		isLastVisibleCell: false,
		onDaySelect: jest.fn(),
		outsideCurrentMonth: false,
		startDate: new Date(2023, 3, 2),
	};

	describe("highlighting days inside and outside of range", () => {
		test("renders the day within the selected range", () => {
			const dayInRange = new Date(2023, 3, 15);

			render(
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RangeDay {...mockProps} day={dayInRange} />
				</LocalizationProvider>,
			);

			expect(screen.getByRole("button")).toHaveClass("inSelectedRange");
		});

		test("renders a day outside of the selected range", () => {
			const dayOutOfRange = new Date(2023, 3, 31);

			render(
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RangeDay {...mockProps} day={dayOutOfRange} />
				</LocalizationProvider>,
			);

			expect(screen.getByRole("button")).toHaveClass("outOfSelectedRange");
		});

		test("render the day at the start of selected range boundary", () => {
			const dayOnBoundary = mockProps.startDate;

			render(
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RangeDay {...mockProps} day={dayOnBoundary} />
				</LocalizationProvider>,
			);

			expect(screen.getByRole("button")).toHaveClass("inSelectedRange");
		});

		test("render the day at the end of selected range boundary", () => {
			const dayOnBoundary = mockProps.endDate;

			render(
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<RangeDay {...mockProps} day={dayOnBoundary} />
				</LocalizationProvider>,
			);

			expect(screen.getByRole("button")).toHaveClass("inSelectedRange");
		});
	});
});
