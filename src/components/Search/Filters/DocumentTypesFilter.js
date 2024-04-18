import { useMemo } from "react";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";

import Filter from "components/Filter";

import { FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

const filterKey = FILTER_KEYS.DOCUMENT_TYPES;

const DocumentTypesFilter = () => {
	const { onFilterChange, selectedFilters } = useSearch();

	const { data = [{ searchResults: [] }] } = useLists({ enabled: true });

	const items = useMemo(() => {
		return data[0].searchResults
			.filter((item) => item.type === LIST_TYPE_FILTER_KEYS[filterKey])
			.reduce((acc, curr) => {
				const existingItem = acc.find((item) => item.description === curr.name);
				if (existingItem) {
					existingItem.key.push(curr._id);
				} else {
					acc.push({
						description: curr.name,
						key: [curr._id],
						filterKey,
					});
				}
				return acc;
			}, [])
			.sort((a, b) => a.description > b.description)
			.map((item) => ({
				...item,
				key: item.key.join(", "),
			}));
	}, [data]);

	console.log("items", items);

	const selected = useMemo(() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey), [selectedFilters]);

	return (
		<Filter
			icon={<ArticleOutlinedIcon />}
			items={items}
			onChange={(filters) => onFilterChange(filterKey, filters)}
			selected={selected}
			title="Document Types"
		/>
	);
};

export default DocumentTypesFilter;
