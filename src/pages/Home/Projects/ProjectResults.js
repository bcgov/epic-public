import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

import { useSearch } from "contexts/Search";

import useProjects from "queries/useProjects";

import Results from "components/Results";

import { getFormatDateLongMonth } from "services/date.js";

import { TABLE_DEFAULTS } from "constants";

const useStyles = makeStyles()((theme) => ({
	container: {
		backgroundColor: "#FFFFFF",
	},
}));

const ProjectResults = ({ onSearch }) => {
	const { isSearching, searchTerm, selectedFilters } = useSearch();
	const [order, setOrder] = useState(TABLE_DEFAULTS.DEFAULT_SORT.DEFAULT_ORDER);
	const [orderBy, setOrderBy] = useState(TABLE_DEFAULTS.DEFAULT_SORT.DEFAULT_ORDER_BY);
	const [pageNum, setPageNum] = useState(TABLE_DEFAULTS.DEFAULT_CURRENT_PAGE);
	const [pageSize, setPageSize] = useState(TABLE_DEFAULTS.DEFAULT_PAGE_SIZE);

	const { classes } = useStyles();
	const tableColumns = [
		{
			name: "Name",
			value: "name",
			sortName: "name",
		},
		{
			name: "Proponent",
			value: "proponent",
			sortName: "proponent.name",
		},
		{
			name: "Type",
			value: "type",
			sortName: "type",
		},
		{
			name: "Date",
			value: "dateUpdated",
			sortName: "dateUpdated",
		},
		{
			name: "Region",
			value: "region",
			sortName: "region",
		},
		{
			name: "Phase",
			value: "currentPhaseName",
			sortName: "currentPhaseName.name",
		},
	];

	const tableParameters = {
		pageNum,
		pageSize,
		sortBy: {
			order: order,
			orderBy: orderBy,
		},
	};

	const { data = [{ searchResults: [], meta: [{ searchResultsTotal: 0 }] }] } = useProjects(
		searchTerm,
		selectedFilters,
		tableParameters,
		{ enabled: isSearching },
	);

	const projects = useMemo(
		() =>
			data[0].searchResults.map(({ _id, currentPhaseName, dateUpdated, name, proponent, region, type }) => ({
				currentPhaseName: currentPhaseName.name,
				dateUpdated: getFormatDateLongMonth(new Date(dateUpdated)),
				key: _id,
				name,
				proponent: proponent.name,
				region,
				type,
			})),
		[data],
	);

	const metaData = useMemo(() => data[0].meta, [data]);
	const totalResultCount = metaData.length > 0 ? metaData[0].searchResultsTotal : 0;

	useEffect(() => {
		onSearch(isSearching);
	}, [isSearching, onSearch]);

	return (
		<div className={classes.container}>
			{projects.length > 0 && isSearching && searchTerm && (
				<Results
					columns={tableColumns}
					data={projects}
					order={order}
					orderBy={orderBy}
					pageNum={pageNum}
					pageSize={pageSize}
					setOrder={setOrder}
					setOrderBy={setOrderBy}
					setPageNum={setPageNum}
					setPageSize={setPageSize}
					totalResultCount={totalResultCount}
				/>
			)}
		</div>
	);
};

ProjectResults.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default ProjectResults;
