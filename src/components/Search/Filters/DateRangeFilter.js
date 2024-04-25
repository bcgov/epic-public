import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

import { useSearch } from "contexts/Search";

import DatePickerFilter from "components/DatePickerFilter";

const DateRangeFilter = ({ filterKey }) => {
	const { onFilterChange, selectedFilters } = useSearch();

	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);

	const selected = useMemo(
		() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey),
		[selectedFilters, filterKey],
	);

	return (
		<DatePickerFilter
			endDate={dateEnd}
			filterKey={filterKey}
			icon={<DateRangeOutlinedIcon />}
			onChange={(filters) => onFilterChange(filterKey, filters)}
			selected={selected}
			setEndDate={setDateEnd}
			setStartDate={setDateStart}
			startDate={dateStart}
			title="Date Range"
		/>
	);
};

DateRangeFilter.propTypes = {
	filterKey: PropTypes.string.isRequired,
};

export default DateRangeFilter;
