import { fireEvent, render, screen, within } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import { apiConfig } from "queries/endpoints";
import useDocuments from "queries/useDocuments";
import useLists from "queries/useLists";

import DocumentResults from "./Results";

import { formatDateLongMonth } from "services/date";

import { FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

jest.mock("queries/useDocuments");
jest.mock("queries/useLists");
jest.mock("contexts/Search");

describe("DocumentResults tests", () => {
	const mockSearchState = {
		isSearching: true,
		searchTerm: "test",
		selectedFilters: [],
	};
	const mockDocumentsData = {
		searchResults: [
			{
				_id: "1",
				datePosted: "2024-03-06T19:15:48.480Z",
				displayName: "Document 1",
				documentAuthorType: "authorTypeId_1",
				documentFileName: "document1.pdf",
				internalOriginalName: "document1.pdf",
				project: { _id: "2", name: "Project 2" },
				projectPhase: "phaseId_1",
				type: "docTypeId_1",
			},
			{
				_id: "5",
				datePosted: "2024-03-07T19:15:48.480Z",
				displayName: "Document 5",
				documentAuthorType: "authorTypeId_2",
				documentFileName: "document5.pdf",
				internalOriginalName: "document5.pdf",
				project: { _id: "3", name: "Project 3" },
				projectPhase: "phaseId_1",
				type: "docTypeId_1",
			},
		],
		meta: [{ searchResultsTotal: 2 }],
	};
	const mockListsData = [
		{
			searchResults: [
				{ _id: "authorTypeId_1", name: "Author 1", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.DOCUMENT_AUTHORS] },
				{ _id: "authorTypeId_2", name: "Author 2", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.DOCUMENT_AUTHORS] },
				{ _id: "docTypeId_1", name: "Doc Type 1", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.DOCUMENT_TYPES] },
				{ _id: "phaseId_1", name: "Phase 1", type: LIST_TYPE_FILTER_KEYS[FILTER_KEYS.DOCUMENT_PROJECT_PHASES] },
			],
		},
	];

	beforeEach(() => {
		useSearch.mockReturnValue(mockSearchState);
		useDocuments.mockReturnValue({ isError: false, isSuccess: true, data: [mockDocumentsData] });
		useLists.mockReturnValue({ data: mockListsData });
	});

	test("should render with the correct data", () => {
		render(<DocumentResults />);

		expect(screen.getByRole("table", { name: "results table" })).toBeInTheDocument();

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockDocumentsData.meta[0].searchResultsTotal); // header and documents

		for (let i = 0; i < mockDocumentsData.searchResults.length; i++) {
			const dataRow = tableRows[i + 1];
			const mockDocument = mockDocumentsData.searchResults[i];

			expect(within(dataRow).getByText(mockDocument.displayName)).toBeInTheDocument();

			const docType = mockListsData[0].searchResults.find((docType) => docType._id === mockDocument.type);
			expect(within(dataRow).getByText(docType.name)).toBeInTheDocument();

			const authorType = mockListsData[0].searchResults.find(
				(author) => author._id === mockDocument.documentAuthorType,
			);
			expect(within(dataRow).getByText(authorType.name)).toBeInTheDocument();

			expect(within(dataRow).getByText(formatDateLongMonth(mockDocument.datePosted))).toBeInTheDocument();

			const projectPhase = mockListsData[0].searchResults.find((phase) => phase._id === mockDocument.projectPhase);
			expect(within(dataRow).getByText(projectPhase.name)).toBeInTheDocument();
		}
	});

	test("should render with the correct link cells", () => {
		render(<DocumentResults />);

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockDocumentsData.meta[0].searchResultsTotal); // header and documents

		const row = tableRows[1];

		const downloadIcon = within(row).getByTestId("FileDownloadOutlinedIcon");
		expect(downloadIcon).toBeInTheDocument();
		expect(downloadIcon.closest("a")).toHaveAttribute(
			"href",
			`${apiConfig.url}/download/${mockDocumentsData.searchResults[0]._id}/download/${mockDocumentsData.searchResults[0].documentFileName}`,
		);

		const projectLink = within(row).getByRole("link", { name: mockDocumentsData.searchResults[0].project.name });
		expect(projectLink).toBeInTheDocument();
		expect(projectLink).toHaveAttribute("href", `/p/${mockDocumentsData.searchResults[0].project._id}/project-details`);
	});

	test("should open the download link in a new tab when a row is clicked", () => {
		jest.spyOn(window, "open").mockImplementation(() => {});

		render(<DocumentResults />);

		const tableRows = screen.getAllByRole("row");
		expect(tableRows.length).toBe(1 + mockDocumentsData.meta[0].searchResultsTotal); // header and document row

		fireEvent.click(tableRows[1]);
		expect(window.open).toHaveBeenCalledWith(
			`${apiConfig.url}/download/${mockDocumentsData.searchResults[0]._id}/download/${mockDocumentsData.searchResults[0].documentFileName}`,
			"_blank",
		);
	});

	test("should not render the component when there are no search results", () => {
		useDocuments.mockReturnValue({ searchResults: [], meta: [{ searchResultsTotal: 0 }] });

		render(<DocumentResults />);

		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});
});
