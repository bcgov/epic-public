import { useMemo } from "react";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import { useSearch } from "contexts/Search";

import Filter from "components/Filter";

import { FILTER_KEYS, PCP_PROJECT_PHASES } from "constants/filters";

const filterKey = FILTER_KEYS.PCP_PROJECT_PHASES;

const PcpPhaseFilter = () => {
	const { onFilterChange, selectedFilters } = useSearch();

	const items = useMemo(() => PCP_PROJECT_PHASES.map((item) => ({ ...item, filterKey })), []);

	const selected = useMemo(() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey), [selectedFilters]);

	return (
		<Filter
			icon={<ForumOutlinedIcon />}
			items={items}
			onChange={(filters) => onFilterChange(filterKey, filters)}
			selected={selected}
			title="Project Phase"
		/>
	);
};

export default PcpPhaseFilter;
