import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import Filters from "../Filters";

jest.mock("contexts/Search");

jest.mock("./services", () => ({
	getFilterComponent: (filterKey) => (
		<div data-testid={`filter-${filterKey}`} key={filterKey}>
			Filter Component
		</div>
	),
}));

describe("Filters test", () => {
	const mockFilters = ["filterA", "filterB"];

	const mockSelectedFilter1 = { description: "Option 1", filterKey: "filterA", key: "option1" };
	const mockSelectedFilter2 = { description: "Option 2", filterKey: "filterA", key: "option2" };

	const mockUseSearch = {
		filters: mockFilters,
		onClearFilters: jest.fn(),
		onRemoveFilter: jest.fn(),
		selectedFilters: [mockSelectedFilter1, mockSelectedFilter2],
	};

	beforeEach(() => {
		useSearch.mockReturnValue(mockUseSearch);
	});

	describe("Filter and chip rendering", () => {
		test("renders the filters", () => {
			render(<Filters />);

			mockFilters.forEach((filterKey) => {
				expect(screen.getByTestId(`filter-${filterKey}`)).toBeInTheDocument();
			});
		});

		test("displays the selected filters as chips", () => {
			render(<Filters />);

			expect(screen.getByRole("button", { name: mockSelectedFilter1.description })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: mockSelectedFilter1.description })).toBeInTheDocument();
		});
	});

	describe("Removing and clearing filters", () => {
		test("calls onRemoveFilter when a filter chip is clicked", () => {
			render(<Filters />);

			const filterChip = screen.getByRole("button", { name: mockSelectedFilter1.description });
			expect(filterChip).toBeInTheDocument();
			fireEvent.click(filterChip.querySelector(".MuiChip-deleteIcon"));

			expect(mockUseSearch.onRemoveFilter).toHaveBeenCalledWith(mockSelectedFilter1.filterKey, mockSelectedFilter1.key);
		});

		test("calls onClearFilters when the clear button is clicked", () => {
			render(<Filters />);

			const clearButton = screen.getByRole("button", { name: "Clear Filters" });
			expect(clearButton).toBeInTheDocument();
			fireEvent.click(clearButton);

			expect(mockUseSearch.onClearFilters).toHaveBeenCalled();
		});
	});
});
