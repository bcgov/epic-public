import { fireEvent, render, screen } from "@testing-library/react";

import { SearchProvider, useSearch } from "./Search";

import { getTabFilters } from "services/filters";

jest.mock("services/filters");

const customRender = (ui, options) => {
	return render(<SearchProvider tabKey="testTab">{ui}</SearchProvider>, options);
};

const mockFilter = { description: "Option 1", filterKey: "mockFilter", key: "option1" };

const SearchContextTest = () => {
	const {
		filters,
		isSearching,
		onClearFilters,
		onFilterChange,
		onRemoveFilter,
		onSearch,
		onSearchTermChange,
		searchTerm,
		selectedFilters,
		tabKey,
	} = useSearch();

	return (
		<div>
			<div data-testid="filters">{JSON.stringify(filters)}</div>
			<div data-testid="isSearching">{JSON.stringify(isSearching)}</div>
			<button onClick={onClearFilters} aria-label="onClearFilters">
				onClearFilters
			</button>
			<button onClick={() => onFilterChange(mockFilter.filterKey, [mockFilter])} aria-label="onFilterChange">
				onFilterChange
			</button>
			<button onClick={() => onRemoveFilter(mockFilter.filterKey, mockFilter.key)} aria-label="onRemoveFilter">
				onRemoveFilter
			</button>
			<button onClick={onSearch} aria-label="onSearch">
				onSearch
			</button>
			<button onClick={() => onSearchTermChange("term")} aria-label="onSearchTermChange">
				onSearchTermChange
			</button>
			<div data-testid="searchTerm">{JSON.stringify(searchTerm)}</div>
			<div data-testid="selectedFilters">{JSON.stringify(selectedFilters)}</div>
			<div data-testid="tabKey">{JSON.stringify(tabKey)}</div>
		</div>
	);
};

describe("Search Context tests", () => {
	const mockFilters = ["mockFilter", "mockFilter2"];

	beforeEach(() => {
		getTabFilters.mockReturnValue(mockFilters);
	});

	test("should render initial values ", () => {
		customRender(<SearchContextTest />);

		expect(screen.getByTestId("filters")).toHaveTextContent(JSON.stringify(mockFilters));
		expect(screen.getByTestId("isSearching")).toHaveTextContent(JSON.stringify(false));
		expect(screen.getByTestId("searchTerm")).toHaveTextContent(JSON.stringify(""));
		expect(screen.getByTestId("selectedFilters")).toHaveTextContent(JSON.stringify([]));
		expect(screen.getByTestId("tabKey")).toHaveTextContent("testTab");
	});

	describe("Filter Behavior", () => {
		test("should add and remove filters to the selected filters", () => {
			customRender(<SearchContextTest />);

			// Add filter
			const onFilterChangeButton = screen.getByRole("button", { name: "onFilterChange" });
			expect(onFilterChangeButton).toBeInTheDocument();
			fireEvent.click(onFilterChangeButton);
			expect(screen.getByTestId("selectedFilters")).toHaveTextContent(JSON.stringify(mockFilter));

			// Remove filter
			const removeFilterButton = screen.getByRole("button", { name: "onRemoveFilter" });
			expect(removeFilterButton).toBeInTheDocument();
			fireEvent.click(removeFilterButton);

			expect(screen.getByTestId("selectedFilters")).toHaveTextContent(JSON.stringify([]));
		});

		test("should add and clear filter", () => {
			customRender(<SearchContextTest />);

			expect(screen.getByTestId("selectedFilters")).toHaveTextContent("[]");

			// Add filter to be cleared
			const onFilterChangeButton = screen.getByRole("button", { name: "onFilterChange" });
			expect(onFilterChangeButton).toBeInTheDocument();
			fireEvent.click(onFilterChangeButton);
			expect(screen.getByTestId("selectedFilters")).toHaveTextContent(JSON.stringify(mockFilter));

			// Clear filters
			const onClearFilterButton = screen.getByRole("button", { name: "onClearFilters" });
			expect(onClearFilterButton).toBeInTheDocument();
			fireEvent.click(onClearFilterButton);
			expect(screen.getByTestId("selectedFilters")).toHaveTextContent(JSON.stringify([]));
		});
	});

	describe("Search Behavior", () => {
		test("should update the search term and search state", () => {
			customRender(<SearchContextTest />);

			const onSearchTermChangeButton = screen.getByRole("button", { name: "onSearchTermChange" });
			expect(onSearchTermChangeButton).toBeInTheDocument();
			fireEvent.click(onSearchTermChangeButton);

			expect(screen.getByTestId("searchTerm")).toHaveTextContent(JSON.stringify("term"));
			expect(screen.getByTestId("isSearching")).toHaveTextContent(JSON.stringify(false));
		});

		test("should trigger search when there is a searchTerm and onSearch is clicked", () => {
			customRender(<SearchContextTest />);

			const onSearchTermChangeButton = screen.getByRole("button", { name: "onSearchTermChange" });
			expect(onSearchTermChangeButton).toBeInTheDocument();
			fireEvent.click(onSearchTermChangeButton);

			const searchButton = screen.getByRole("button", { name: "onSearch" });
			expect(searchButton).toBeInTheDocument();
			fireEvent.click(searchButton);

			expect(screen.getByTestId("isSearching")).toHaveTextContent(JSON.stringify(true));
		});
	});
});
