import { useMemo } from "react";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";

import Filter from "components/Filter";

import { DOCUMENT_AUTHORS, FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

const filterKey = FILTER_KEYS.DOCUMENT_AUTHORS;

const DocumentAuthorsFilter = () => {
	const { onFilterChange, selectedFilters } = useSearch();

	const { data = [{ searchResults: [] }] } = useLists({ enabled: true });

	const items = useMemo(() => {
		const mappedDocAuthors = DOCUMENT_AUTHORS.map((author) => {
			const matchingIds = data[0].searchResults
				.filter((item) => item.type === LIST_TYPE_FILTER_KEYS[filterKey])
				.filter((item) => author.map.includes(item.name))
				.map((item) => item._id)
				.join(",");

			return {
				...author,
				key: matchingIds,
				filterKey,
			};
		});
		return mappedDocAuthors;
	}, [data]);

	const selected = useMemo(() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey), [selectedFilters]);

	return (
		<Filter
			icon={<PersonOutlinedIcon />}
			items={items}
			onChange={(filters) => onFilterChange(filterKey, filters)}
			selected={selected}
			title="Document Authors"
		/>
	);
};

export default DocumentAuthorsFilter;
