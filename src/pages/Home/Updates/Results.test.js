import { render, screen, within } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";
import useUpdates from "queries/useUpdates";

import UpdatesResults from "./Results";

import { formatDateLongMonth } from "services/date";

import { FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

jest.mock("contexts/Search");
jest.mock("queries/useLists");
jest.mock("queries/useUpdates");

describe("UpdatesResults tests", () => {
	const mockSearchState = {
		isSearching: true,
		searchTerm: "test",
		selectedFilters: [],
	};
	const mockUpdateData = {
		searchResults: [
			{
				_id: "1",
				dateAdded: "2022-01-01T00:00:00.000Z",
				project: {
					_id: "2",
					name: "Project 2",
					currentPhaseName: "phaseId_1",
				},
				type: "News",
				complianceAndEnforcement: true,
			},
			{
				_id: "6",
				dateAdded: "2022-04-21T00:00:00.000Z",
				project: {
					_id: "7",
					name: "Project 7",
					currentPhaseName: "phaseId_2",
				},
				type: "Public Comment Period",
			},
		],
		meta: [{ searchResultsTotal: 2 }],
	};
	const mockListsData = [
		{
			searchResults: [
				{ _id: "phaseId_1", name: "Phase 1", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.PROJECT_PHASES] },
				{ _id: "phaseId_2", name: "Phase 2", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.PROJECT_PHASES] },
			],
		},
	];

	beforeEach(() => {
		useLists.mockReturnValue({ data: mockListsData });
		useSearch.mockReturnValue(mockSearchState);
		useUpdates.mockReturnValue({ isError: false, isSuccess: true, data: [mockUpdateData] });
	});

	test("should render with the correct data", () => {
		render(<UpdatesResults />);

		expect(screen.getByRole("table", { name: "results table" })).toBeInTheDocument();

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockUpdateData.meta[0].searchResultsTotal); // header and pcps

		for (let i = 0; i < mockUpdateData.searchResults.length; i++) {
			const dataRow = tableRows[i + 1];
			const mockUpdate = mockUpdateData.searchResults[i];

			expect(within(dataRow).getByText(mockUpdate.project.name)).toBeInTheDocument();

			const projectPhase = mockListsData[0].searchResults.find(
				(phase) => phase._id === mockUpdate.project.currentPhaseName,
			);
			expect(within(dataRow).getByText(projectPhase.name)).toBeInTheDocument();

			expect(within(dataRow).getByText(formatDateLongMonth(mockUpdate.dateAdded))).toBeInTheDocument();
			expect(
				within(dataRow).getByText(mockUpdate.complianceAndEnforcement ? `${mockUpdate.type} / C&E` : mockUpdate.type),
			).toBeInTheDocument();
		}
	});

	test("should not render the component when there are no search results", () => {
		useUpdates.mockReturnValue({ searchResults: [], meta: [{ searchResultsTotal: 0 }] });

		render(<UpdatesResults />);

		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});
});
