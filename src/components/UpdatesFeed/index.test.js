import { fireEvent, render, screen, within } from "@testing-library/react";

import useRecentActivity from "queries/useRecentActivity";

import UpdatesFeed from "../UpdatesFeed";

import { HOME_TAB_KEYS } from "constants/home";

jest.mock("queries/useRecentActivity");

describe("UpdatesFeed tests", () => {
	const mockData = [
		{
			_id: "1",
			content: "Update 1 content",
			dateUpdated: "2022-09-13T23:03:02.878Z",
			headline: "Update 1 headline",
			documentUrl: "https://example.com/document1",
			project: { name: "Project 1" },
			pcp: { name: "PCP 1" },
		},
		{
			_id: "2",
			content: "Update 2 content",
			dateUpdated: "2022-09-13T23:03:02.878Z",
			headline: "Update 2 headline",
			documentUrl: "https://example.com/document2",
			project: { name: "Project 2" },
			pcp: { name: "PCP 2" },
		},
	];
	const mockOnSelectTab = jest.fn();

	beforeEach(() => {
		useRecentActivity.mockReturnValue({ isError: false, isSuccess: true, data: mockData });
	});

	describe("UpdatesFeed header rendering", () => {
		test("should render the feed header content and call onSelectTab when 'Search All' button is clicked", () => {
			render(<UpdatesFeed onSelectTab={mockOnSelectTab} />);

			const updatesButton = screen.getByRole("button", { name: "Search all Updates >" });
			expect(updatesButton).toBeInTheDocument();
			fireEvent.click(updatesButton);

			expect(mockOnSelectTab).toHaveBeenCalledWith(HOME_TAB_KEYS.UPDATES);
			expect(screen.getByRole("heading", { level: 1, name: "Updates" })).toBeInTheDocument();
		});
	});

	describe("UpdateCard rendering", () => {
		test("should render the expected number of UpdateCard components in a list", () => {
			render(<UpdatesFeed onSelectTab={mockOnSelectTab} />);

			expect(screen.getByRole("list", { name: "Updates list" })).toBeInTheDocument();

			const updateCards = screen.getAllByRole("listitem");
			expect(updateCards.length).toBe(mockData.length);

			updateCards.forEach((card, i) => {
				const { content, headline } = mockData[i];

				expect(within(card).getByText(headline)).toBeInTheDocument();
				expect(within(card).getByText(content)).toBeInTheDocument();
			});

			expect(mockOnSelectTab).not.toHaveBeenCalled();
		});
	});
});
