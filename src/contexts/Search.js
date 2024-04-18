import { createContext, useContext, useEffect, useRef, useState } from "react";

import { getTabFilters } from "services/filters";

const SearchContext = createContext();

const Search = ({ children: childNodes, tabKey }) => {
	const [filters, setFilters] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilters, setSelectedFilters] = useState([]);
	const filtersRef = useRef();
	// initialize filters
	useEffect(() => {
		if (filtersRef.current) return;
		filtersRef.current = true;

		setFilters(getTabFilters(tabKey));
	}, [tabKey]);

	const onClearFilters = () => {
		setSelectedFilters([]);
	};

	const onFilterChange = (filterKey, filters) => {
		const keys = filters.map(({ key }) => key);

		setSelectedFilters((selectedFilters) => {
			const remaining = selectedFilters.filter(({ filterKey: fk, key }) => fk !== filterKey || keys.includes(key));
			const added = filters.filter(
				({ key }) => !remaining.find(({ filterKey: fk, key: k }) => fk === filterKey && k === key),
			);
			return [...remaining, ...added];
		});
	};

	const onRemoveFilter = (filterKey, key) => {
		setSelectedFilters((selectedFilters) =>
			selectedFilters.filter(({ filterKey: fk, key: k }) => fk !== filterKey || k !== key),
		);
	};

	const onSearch = () => {
		if (!searchTerm || isSearching) return;
		setIsSearching(true);
	};

	const onSearchTermChange = (term) => {
		setSearchTerm(term);

		if (!term) {
			setIsSearching(false);
		}
	};

	const value = {
		filters,
		isSearching,
		onClearFilters,
		onFilterChange,
		onRemoveFilter,
		onSearch,
		onSearchTermChange,
		searchTerm,
		selectedFilters,
		tabKey,
	};
	return <SearchContext.Provider value={value}>{childNodes}</SearchContext.Provider>;
};

export const SearchProvider = ({ children, tabKey }) => {
	return <Search tabKey={tabKey}>{children}</Search>;
};

export const useSearch = () => {
	const context = useContext(SearchContext);
	console.log(`context`, context);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};
