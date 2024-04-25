import { act, fireEvent, render, screen, within } from "@testing-library/react";

import DatePickerFilter from "./index";

import { formatDateLongMonth, formatDateOnlyISO, formatDateShortMonth } from "services/date";

describe("DatePickerFilter tests", () => {
	const endDate = new Date(2023, 3, 1);
	const startDate = new Date(2023, 3, 15);

	const mockProps = {
		endDate: endDate,
		filterKey: "dateRange",
		icon: <div>Icon</div>,
		onChange: jest.fn(),
		selected: [
			{
				description: `${formatDateShortMonth(startDate)} to ${formatDateShortMonth(endDate)}`,
				filterKey: "dateRange",
				key: `${formatDateOnlyISO(startDate)},${formatDateOnlyISO(endDate)}`,
			},
		],
		setEndDate: jest.fn(),
		setStartDate: jest.fn(),
		startDate: startDate,
		title: "Date Range",
	};

	describe("DatePickerFilter rendering and toggle", () => {
		test("should render the component correctly", () => {
			render(<DatePickerFilter {...mockProps} />);

			const menuButton = screen.getByRole("button", { name: "Select Date Range" });
			expect(menuButton).toBeInTheDocument();
			expect(within(menuButton).getByText(mockProps.title)).toBeInTheDocument();
			expect(screen.getByLabelText("Date Range Picker")).not.toBeVisible();
		});

		test("should toggle the dropdown on button click", () => {
			render(<DatePickerFilter {...mockProps} />);

			const menuButton = screen.getByRole("button", { name: "Select Date Range" });
			expect(screen.getByLabelText("Date Range Picker")).not.toBeVisible();

			fireEvent.click(menuButton);
			expect(screen.getByLabelText("Date Range Picker")).toBeVisible();

			fireEvent.click(menuButton);
			expect(screen.getByLabelText("Date Range Picker")).not.toBeVisible();
		});
	});

	describe("DatePickerFilter start and end date change", () => {
		test("should update the selected dates", () => {
			const updatedStartDate = new Date(2023, 4, 14);
			const updatedEndDate = new Date(2023, 4, 30);

			render(<DatePickerFilter {...mockProps} />);

			const menuButton = screen.getByRole("button", { name: "Select Date Range" });
			fireEvent.click(menuButton);

			const dateRangePicker = screen.getByLabelText("Date Range Picker");
			fireEvent.change(dateRangePicker, { startDate: updatedStartDate, endDate: updatedEndDate });

			expect(mockProps.onChange).toHaveBeenCalledWith([
				{
					description: `${formatDateShortMonth(startDate)} to ${formatDateShortMonth(endDate)}`,
					filterKey: "dateRange",
					key: `${formatDateOnlyISO(startDate)},${formatDateOnlyISO(endDate)}`,
				},
			]);
		});

		test("should reset the start and end dates when the filter is not in the selected items", () => {
			const { rerender } = render(<DatePickerFilter {...mockProps} />);

			const dateRangeLabel = screen.getByLabelText("Date range label");
			expect(within(dateRangeLabel).getByText(formatDateLongMonth(startDate))).toBeInTheDocument();
			expect(within(dateRangeLabel).getByText(formatDateLongMonth(endDate))).toBeInTheDocument();

			act(() => {
				rerender(<DatePickerFilter {...mockProps} selected={[]} />);
			});

			expect(mockProps.setStartDate).toHaveBeenCalledWith(null);
			expect(mockProps.setEndDate).toHaveBeenCalledWith(null);
		});
	});
});
