import { useMemo } from "react";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import { useSearch } from "contexts/Search";

import Filter from "components/Filter";

import { FILTER_KEYS, UPDATE_TYPES } from "constants/filters";

const filterKey = FILTER_KEYS.UPDATE_TYPES;

const UpdateTypesFilter = () => {
	const { onFilterChange, selectedFilters } = useSearch();

	const items = useMemo(
		() =>
			UPDATE_TYPES.map((item) => {
				if (item.key === FILTER_KEYS.UPDATE_C_AND_E) {
					return { ...item, key: "true", filterKey: FILTER_KEYS.UPDATE_C_AND_E };
				} else {
					return { ...item, filterKey };
				}
			}),
		[],
	);

	const selected = useMemo(
		() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey || fk === FILTER_KEYS.UPDATE_C_AND_E),
		[selectedFilters],
	);

	return (
		<Filter
			icon={<ForumOutlinedIcon />}
			items={items}
			onChange={(filters) => {
				onFilterChange(
					filterKey,
					filters.filter(({ filterKey: fk }) => fk === filterKey),
				);
				onFilterChange(
					FILTER_KEYS.UPDATE_C_AND_E,
					filters.filter(({ filterKey: fk }) => fk === FILTER_KEYS.UPDATE_C_AND_E),
				);
			}}
			selected={selected}
			title="Types of Update"
		/>
	);
};

export default UpdateTypesFilter;
