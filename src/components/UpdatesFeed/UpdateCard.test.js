import { render, screen } from "@testing-library/react";

import UpdateCard from "./UpdateCard";

describe("UpdateCard tests", () => {
	const mockProject = {
		_id: "1",
		location: "Location",
		name: "Project 1",
		region: "Region",
		type: "type",
	};
	const viewDocumentButtonName = "View Document(s)";
	const viewPcpButtonName = "View Engagement";
	const viewProjectButtonName = "View Project";

	describe("when the update has no documents or PCPs", () => {
		test("should render the UpdateCard correctly", () => {
			const mockUpdate = {
				documentUrl: "",
				project: mockProject,
				updateContent: "Update content.",
				updateDate: "2022-09-13T23:03:02.878Z",
				updateName: "Update Name",
			};

			render(<UpdateCard {...mockUpdate} />);

			expect(screen.getByText(`${mockUpdate.project.name} - Work`)).toBeInTheDocument();
			expect(screen.getByText(mockUpdate.updateName)).toBeInTheDocument();
			expect(screen.getByText(mockUpdate.updateContent)).toBeInTheDocument();
			expect(screen.queryByRole("button", { name: viewDocumentButtonName })).not.toBeInTheDocument();
			expect(screen.queryByRole("button", { name: viewPcpButtonName })).not.toBeInTheDocument();

			const projectLink = screen.getByRole("link", { name: viewProjectButtonName });
			expect(projectLink).toBeInTheDocument();
			expect(projectLink).toHaveAttribute("href", `/p/${mockUpdate.project._id}/project-details`);
		});
	});

	describe("when the update has a Met PCP and a document URL", () => {
		test("should render the UpdateCard correctly", () => {
			const mockMetPcp = {
				_id: "2",
				isMet: true,
				metURL: "https://example.com/met",
			};
			const mockMetPcpUpdate = {
				documentUrl: "https://example.com/document",
				pcp: mockMetPcp,
				project: mockProject,
				updateContent: "Update content.",
				updateDate: "2022-09-13T23:03:02.878Z",
				updateName: "Update Name",
			};

			render(<UpdateCard {...mockMetPcpUpdate} />);

			expect(screen.getByText(`${mockMetPcpUpdate.project.name} - Work`)).toBeInTheDocument();
			expect(screen.getByText(mockMetPcpUpdate.updateName)).toBeInTheDocument();
			expect(screen.getByText(mockMetPcpUpdate.updateContent)).toBeInTheDocument();

			const documentLink = screen.getByRole("link", { name: viewDocumentButtonName });
			expect(documentLink).toBeInTheDocument();
			expect(documentLink).toHaveAttribute("href", mockMetPcpUpdate.documentUrl);

			const metLink = screen.getByRole("link", { name: viewPcpButtonName });
			expect(metLink).toBeInTheDocument();
			expect(metLink).toHaveAttribute("href", mockMetPcpUpdate.pcp.metURL);

			const projectLink = screen.getByRole("link", { name: viewProjectButtonName });
			expect(projectLink).toBeInTheDocument();
			expect(projectLink).toHaveAttribute("href", `/p/${mockMetPcpUpdate.project._id}/project-details`);
		});
	});

	describe("when the update has an EPIC.public PCP and document URL", () => {
		test("should render the UpdateCard correctly", () => {
			const mockPublicPcp = {
				_id: "3",
				isMet: false,
				metURL: "",
			};
			const mockPublicPcpUpdate = {
				documentUrl: "https://example.com/document",
				pcp: mockPublicPcp,
				project: mockProject,
				updateContent: "Update content.",
				updateDate: "2022-09-13T23:03:02.878Z",
				updateName: "Update Name",
			};

			render(<UpdateCard {...mockPublicPcpUpdate} />);

			expect(screen.getByText(`${mockPublicPcpUpdate.project.name} - Work`)).toBeInTheDocument();
			expect(screen.getByText(mockPublicPcpUpdate.updateName)).toBeInTheDocument();
			expect(screen.getByText(mockPublicPcpUpdate.updateContent)).toBeInTheDocument();

			const documentLink = screen.getByRole("link", { name: viewDocumentButtonName });
			expect(documentLink).toBeInTheDocument();
			expect(documentLink).toHaveAttribute("href", mockPublicPcpUpdate.documentUrl);

			const pcpLink = screen.getByRole("link", { name: viewPcpButtonName });
			expect(pcpLink).toBeInTheDocument();
			expect(pcpLink).toHaveAttribute(
				"href",
				`/p/${mockPublicPcpUpdate.project._id}/cp/${mockPublicPcpUpdate.pcp._id}/details`,
			);

			const projectLink = screen.getByRole("link", { name: viewProjectButtonName });
			expect(projectLink).toBeInTheDocument();
			expect(projectLink).toHaveAttribute("href", `/p/${mockPublicPcpUpdate.project._id}/project-details`);
		});
	});
});
