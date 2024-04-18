import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import Link from "@mui/material/Link";

import ResultsPagination from "./Pagination";

const useStyles = makeStyles()((theme) => ({
	container: {
		background: "#FFFFFF",
		color: "white",
		padding: "1rem 3rem",
		"& .MuiTableCell-head": {
			fontSize: "1rem",
			fontWeight: 700,
			backgroundColor: "#FAF9F8",
			borderTop: "1px solid #D1CFCD",
		},
		"& .MuiTableCell-body": {
			fontSize: "1rem",
		},
		"& .MuiTable-root": {
			boxShadow: "none",
		},
		"& .MuiPaper-root": {
			boxShadow: "none",
			borderLeft: "1px solid #D1CFCD",
			borderRight: "1px solid #D1CFCD",
		},
	},
	header: {
		margin: 0,
		paddingTop: "1rem",
	},
	pagination: {
		display: "flex",
	},
}));

const Results = ({
	columns,
	data,
	onRowClick,
	order,
	orderBy,
	pageNum,
	pageSize,
	setOrder,
	setOrderBy,
	setPageNum,
	setPageSize,
	totalResultCount,
}) => {
	const { classes } = useStyles();

	const createSortHandler = (property) => (event) => {
		handleRequestSort(property);
	};

	const handleRequestSort = (tableColumn) => {
		const isAsc = orderBy === tableColumn && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(tableColumn);
	};

	return (
		<div className={classes.container}>
			<ResultsPagination
				pageNum={pageNum}
				pageSize={pageSize}
				setPageNum={setPageNum}
				setPageSize={setPageSize}
				totalResultCount={totalResultCount}
			/>
			<TableContainer component={Paper}>
				<Table aria-label="results table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.value}>
									<TableSortLabel
										active={orderBy === column.sortName}
										direction={orderBy === column.sortName ? order : "asc"}
										onClick={createSortHandler(column.sortName)}
									>
										{column.name}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow
								key={row.key}
								hover={true}
								{...(onRowClick && { onClick: () => onRowClick(row) })}
								sx={{
									cursor: onRowClick ? "pointer" : "default",
								}}
							>
								{columns.map((column) =>
									column.isLink ? (
										<TableCell key={column.value}>
											<span onClick={(event) => event.stopPropagation()}>
												<Link href={row[column.linkValue]} underline="hover">
													{row[column.value]}
												</Link>
											</span>
										</TableCell>
									) : (
										<TableCell key={column.value}>{row[column.value]}</TableCell>
									),
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<ResultsPagination
				pageNum={pageNum}
				pageSize={pageSize}
				setPageNum={setPageNum}
				setPageSize={setPageSize}
				totalResultCount={totalResultCount}
			/>
		</div>
	);
};

Results.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	onRowClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	setOrder: PropTypes.func.isRequired,
	setOrderBy: PropTypes.func.isRequired,
};

export default Results;
