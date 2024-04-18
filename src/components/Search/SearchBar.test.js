import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import SearchBar from "./SearchBar";

jest.mock("contexts/Search");

describe("SearchBar tests", () => {
	const mockSearchContextValue = {
		isSearching: false,
		onSearch: jest.fn(),
		onSearchTermChange: jest.fn(),
		searchTerm: "",
	};

	beforeEach(() => {
		useSearch.mockReturnValue(mockSearchContextValue);
	});

	test("should render the search input and search button", () => {
		const placeholder = "Search by keywords for Project Name, Project Type, Project Region, and Proponent";
		render(<SearchBar placeholder={placeholder} />);

		const searchInput = screen.getByRole("textbox");
		expect(searchInput).toBeInTheDocument();
		expect(searchInput).toHaveAttribute("placeholder", placeholder);

		expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
	});

	test("should call onSearchTermChange when the input value changes", async () => {
		render(<SearchBar />);

		const searchInput = screen.getByRole("textbox");
		expect(searchInput).toBeInTheDocument();
		fireEvent.change(searchInput, { target: { value: "test" } });

		expect(mockSearchContextValue.onSearchTermChange).toHaveBeenCalledWith("test");
	});

	test("should call onSearch when the search button is clicked", () => {
		useSearch.mockReturnValue({ ...mockSearchContextValue, searchTerm: "test" });

		render(<SearchBar />);

		const searchButton = screen.getByRole("button", { name: "Search" });
		expect(searchButton).toBeInTheDocument();
		fireEvent.click(searchButton);

		expect(mockSearchContextValue.onSearch).toHaveBeenCalled();
	});

	test("should call onSearch when the Enter key is pressed", () => {
		render(<SearchBar />);

		const searchInput = screen.getByRole("textbox");
		expect(searchInput).toBeInTheDocument();
		fireEvent.keyDown(searchInput, { code: "Enter" });

		expect(mockSearchContextValue.onSearch).toHaveBeenCalled();
	});

	describe("Disabled and enabled search conditions", () => {
		test("should disable the search button when the search term is empty", () => {
			render(<SearchBar />);

			expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
		});

		test("should disable the search button when isSearching is true", () => {
			useSearch.mockReturnValue({ ...mockSearchContextValue, isSearching: true, searchTerm: "test" });
			render(<SearchBar />);

			expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
		});

		test("should enable the search button when a search term exists", () => {
			useSearch.mockReturnValue({ ...mockSearchContextValue, searchTerm: "test" });
			render(<SearchBar />);

			expect(screen.getByRole("button", { name: "Search" })).not.toBeDisabled();
		});
	});
});
