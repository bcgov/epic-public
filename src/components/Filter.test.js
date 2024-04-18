import { fireEvent, render, screen, within } from "@testing-library/react";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import Filter from "./Filter";

describe("Filter tests", () => {
	const mockProps = {
		items: [
			{ description: "Item 1", key: "item1" },
			{ description: "Item 2", key: "item2" },
			{ description: "Item 3", key: "item3" },
		],
		onChange: jest.fn(),
		selected: [
			{ description: "Item 1", key: "item1" },
			{ description: "Item 3", key: "item3" },
		],
		title: "Filter Title",
	};

	describe("Dropdown and item rendering", () => {
		test("renders the initial dropdown state correctly", () => {
			render(<Filter {...mockProps} icon={<PlaceOutlinedIcon />} />);

			// Open the dropdown menu
			const filterButton = screen.getByRole("button", { name: `Select ${mockProps.title}` });
			expect(filterButton).toBeInTheDocument();
			expect(filterButton).not.toBeDisabled();

			expect(screen.getByTestId("PlaceOutlinedIcon")).toBeInTheDocument();
			expect(screen.getByTestId("ExpandMoreIcon")).toBeInTheDocument();
		});

		test("opens the dropdown menu and displays the items and selection", () => {
			render(<Filter {...mockProps} />);

			// Open the dropdown menu
			const filterButton = screen.getByRole("button", { name: `Select ${mockProps.title}` });
			expect(filterButton).toBeInTheDocument();
			fireEvent.click(filterButton);
			expect(screen.getByRole("menu")).toBeInTheDocument();
			expect(screen.getByTestId("ExpandLessIcon")).toBeInTheDocument();

			const menuItems = screen.getAllByRole("menuitem");
			expect(menuItems.length).toBe(mockProps.items.length);
			menuItems.forEach((item, i) => {
				const { key } = mockProps.items[i];
				const itemCheckbox = within(item).getByRole("checkbox");
				expect(itemCheckbox).toBeInTheDocument();
				if (mockProps.selected.find((selectedItem) => selectedItem.key === key)) {
					expect(itemCheckbox).toBeChecked();
				} else {
					expect(itemCheckbox).not.toBeChecked();
				}
			});
		});

		test("disables the dropdown when there are no items", () => {
			render(<Filter {...mockProps} items={[]} selected={[]} />);

			expect(screen.getByRole("button", { name: `Select ${mockProps.title}` })).toBeDisabled();
		});
	});

	describe("Selection and deselection of items", () => {
		test("selects and deselects items in the dropdown menu", () => {
			render(<Filter {...mockProps} />);

			// Open the dropdown menu
			const filterButton = screen.getByRole("button", { name: `Select ${mockProps.title}` });
			expect(filterButton).toBeInTheDocument();
			fireEvent.click(filterButton);

			let menuItem = screen.getByRole("menuitem", { name: mockProps.selected[0].description });
			expect(menuItem).toBeInTheDocument();
			expect(within(menuItem).getByRole("checkbox")).toBeChecked();

			// deselect checkbox
			fireEvent.click(menuItem);
			expect(within(menuItem).getByRole("checkbox")).not.toBeChecked();

			// select checkbox
			fireEvent.click(menuItem);
			expect(within(menuItem).getByRole("checkbox")).toBeChecked();
		});

		test("calls the onChange callback with the correct selected items", () => {
			render(<Filter {...mockProps} selected={[]} />);

			// Open the dropdown menu
			const filterButton = screen.getByRole("button", { name: `Select ${mockProps.title}` });
			expect(filterButton).toBeInTheDocument();
			fireEvent.click(filterButton);

			fireEvent.click(screen.getByRole("menuitem", { name: mockProps.items[0].description }));
			expect(mockProps.onChange).toHaveBeenCalledWith([mockProps.items[0]]);
		});
	});
});
