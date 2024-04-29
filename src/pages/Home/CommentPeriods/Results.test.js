import { fireEvent, render, screen, within } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import usePcps from "queries/usePcps";

import CommentPeriodResults from "./Results";

import { formatDateLongMonth } from "services/date";
import { getStatus } from "services/pcp";

jest.mock("queries/usePcps");
jest.mock("contexts/Search");

describe("CommentPeriodResults tests", () => {
	const mockSearchState = {
		isSearching: true,
		searchTerm: "test",
		selectedFilters: [],
	};
	const mockPcpData = {
		searchResults: [
			{
				_id: "1",
				dateCompleted: "2023-04-01T00:00:00.000Z",
				dateStarted: "2023-03-01T00:00:00.000Z",
				metURL: "https://example.com",
				phaseName: "Phase 1",
				project: { id: "7", name: "Project C" },
			},
			{
				_id: "2",
				dateCompleted: "2050-04-01T00:00:00.000Z",
				dateStarted: "2050-03-01T00:00:00.000Z",
				phaseName: "Phase 2",
				project: { id: "8", name: "Project B" },
			},
			{
				_id: "3",
				dateCompleted: "2050-04-01T00:00:00.000Z",
				dateStarted: "2023-03-01T00:00:00.000Z",
				phaseName: "Phase 1",
				project: { id: "9", name: "Project A" },
			},
		],
		meta: [{ searchResultsTotal: 3 }],
	};

	beforeEach(() => {
		useSearch.mockReturnValue(mockSearchState);
		usePcps.mockReturnValue({ isError: false, isSuccess: true, data: [mockPcpData] });
	});

	test("should render with the correct data", () => {
		render(<CommentPeriodResults />);

		expect(screen.getByRole("table", { name: "results table" })).toBeInTheDocument();

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockPcpData.meta[0].searchResultsTotal); // header and pcps

		for (let i = 0; i < mockPcpData.searchResults.length; i++) {
			const dataRow = tableRows[i + 1];
			const mockPcp = mockPcpData.searchResults[i];

			expect(within(dataRow).getByText(mockPcp.phaseName)).toBeInTheDocument();
			expect(within(dataRow).getByText(mockPcp.project.name)).toBeInTheDocument();
			expect(
				within(dataRow).getByText(
					`${formatDateLongMonth(mockPcp.dateStarted)} - ${formatDateLongMonth(mockPcp.dateCompleted)}`,
				),
			).toBeInTheDocument();
			expect(within(dataRow).getByText(getStatus(mockPcp.dateStarted, mockPcp.dateCompleted))).toBeInTheDocument();
		}
	});

	test("should render with the correct linked project cell", () => {
		render(<CommentPeriodResults />);

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockPcpData.meta[0].searchResultsTotal); // header and pcps

		const row = tableRows[1];

		const projectLink = within(row).getByRole("link", { name: mockPcpData.searchResults[0].project.name });
		expect(projectLink).toBeInTheDocument();
		expect(projectLink).toHaveAttribute("href", `/p/${mockPcpData.searchResults[0].project._id}/project-details`);
	});

	test("should open the MET URL when a MET pcp row is clicked", () => {
		jest.spyOn(window, "open").mockImplementation(() => {});

		render(<CommentPeriodResults />);

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockPcpData.meta[0].searchResultsTotal); // header and pcps

		fireEvent.click(tableRows[1]);
		expect(window.open).toHaveBeenCalledWith(mockPcpData.searchResults[0].metURL);
	});

	test("should not render the component when there are no search results", () => {
		usePcps.mockReturnValue({ searchResults: [], meta: [{ searchResultsTotal: 0 }] });

		render(<CommentPeriodResults />);

		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});
});
