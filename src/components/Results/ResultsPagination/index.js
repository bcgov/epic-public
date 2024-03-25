import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";

import { Pagination, TablePagination } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import PageFirstButton from "./PageFirstButton";
import PageLastButton from "./PageLastButton";
import PageNextButton from "./PageNextButton";
import PagePreviousButton from "./PagePreviousButton";

import { TABLE_DEFAULTS } from "constants";

const useStyles = makeStyles()((theme) => ({
	container: {
		display: "flex",
		width: "100%",
		fontSize: "0.875rem",
	},
	subcontainer: {
		display: "flex",
		marginLeft: "auto",
		paddingRight: "2rem",
	},
	pageNavigation: {
		display: "flex",
		alignItems: "center",
	},
	tablePagination: {
		"& .MuiTablePagination-input": {
			fontWeight: 700,
			margin: "auto",
		},
	},
	pagination: {
		"& button.Mui-selected": {
			backgroundColor: "#15446E",
			color: "#FFFFFF",
		},
		"& button.Mui-selected:hover": {
			backgroundColor: "#45749E",
			color: "#FFFFFF",
		},
		"& .MuiPagination-ul": {
			gap: "0.375rem",
		},
	},
}));

const ResultsPagination = ({ pageNum, pageSize, setPageNum, setPageSize, totalResultCount }) => {
	const { classes } = useStyles();
	// MUI Pagination component is 1-indexed
	const pageNumberOffset = 1;

	const getPageNumberOptions = () => {
		// creates the list of page numbers for pagenation
		const pageNumbers = [];
		TABLE_DEFAULTS.DEFAULT_ROWS_PER_PAGE.forEach((number) => {
			if (number < totalResultCount) {
				pageNumbers.push(number);
			}
		});
		pageNumbers.push({ value: totalResultCount, label: "All" });
		return pageNumbers;
	};

	const pageNumberOptions = getPageNumberOptions();

	const handleChangePage = (event, newPage) => {
		setPageNum(newPage);
	};

	const handleOneIndexedChangePage = (event, newPage) => {
		setPageNum(newPage - pageNumberOffset);
	};

	const handleChangeRowsPerPage = (event) => {
		setPageSize(parseInt(event.target.value, 10));
		setPageNum(0);
	};

	const customLabelDisplayedRows = ({ from, to, count }) => {
		return `of ${count} results`;
	};
	return (
		<div className={classes.container}>
			<div className={classes.subcontainer}>
				<TablePagination
					className={classes.tablePagination}
					component="div"
					count={totalResultCount}
					page={pageNum}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Showing"
					labelDisplayedRows={customLabelDisplayedRows}
					rowsPerPage={pageSize}
					rowsPerPageOptions={pageNumberOptions}
					showFirstButton={false}
					showLastButton={false}
					slotProps={{
						select: {
							IconComponent: KeyboardArrowDownIcon,
						},
						actions: {
							nextButton: {
								style: { display: "none" },
							},
							previousButton: {
								style: { display: "none" },
							},
						},
					}}
				/>
				<div className={classes.pageNavigation}>
					<PageFirstButton handleChangePage={handleChangePage} pageNum={pageNum} className={classes.navigationButton} />
					<PagePreviousButton
						className={classes.navigationButton}
						handleChangePage={handleChangePage}
						label="Previous"
						pageNum={pageNum}
						pageSize={pageSize}
						totalResultCount={totalResultCount}
					/>
					<Pagination // 1 indexed
						className={classes.pagination}
						count={Math.ceil(totalResultCount / pageSize)}
						hideNextButton={true}
						hidePrevButton={true}
						onChange={handleOneIndexedChangePage}
						page={pageNum + pageNumberOffset}
						shape="rounded"
						size="small"
					/>
					<PageNextButton
						className={classes.navigationButton}
						handleChangePage={handleChangePage}
						label="Next"
						pageNum={pageNum}
						pageSize={pageSize}
						totalResultCount={totalResultCount}
					/>
					<PageLastButton
						className={classes.navigationButton}
						handleChangePage={handleChangePage}
						pageNum={pageNum}
						pageSize={pageSize}
						totalResultCount={totalResultCount}
					/>
				</div>
			</div>
		</div>
	);
};

ResultsPagination.propTypes = {
	pageNum: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	setPageNum: PropTypes.func.isRequired,
	setPageSize: PropTypes.func.isRequired,
	totalResultCount: PropTypes.number.isRequired,
};

export default ResultsPagination;
