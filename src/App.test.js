import { render, screen } from "@testing-library/react";

import useLists from "queries/useLists";
import useOrganizations from "queries/useOrganizations";
import usePcps from "queries/usePcps";
import useProjects from "queries/useProjects";
import useRecentActivity from "queries/useRecentActivity";

import App from "./App";

jest.mock("queries/useOrganizations");
jest.mock("queries/usePcps");
jest.mock("queries/useRecentActivity");
jest.mock("queries/useLists");
jest.mock("queries/useProjects");

describe("App tests", () => {
	beforeEach(() => {
		useOrganizations.mockReturnValue({ isError: false, isSuccess: false });
		usePcps.mockReturnValue({ isError: false, isSuccess: false });
		useRecentActivity.mockReturnValue({ isError: false, isSuccess: false });
		useProjects.mockReturnValue({ isError: false, isSuccess: false });
		useLists.mockReturnValue({ isError: false, isSuccess: false });
	});

	test("renders the app", () => {
		render(<App />);

		expect(screen.getByRole("region", { name: "Header" })).toBeInTheDocument();
		expect(screen.getByRole("tablist", { name: "Main" })).toBeInTheDocument();
		expect(screen.getByRole("tabpanel")).toBeInTheDocument();
	});
});
