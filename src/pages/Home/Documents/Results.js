import { useSearch } from "contexts/Search";

const DocumentResults = () => {
	const { isSearching, searchTerm } = useSearch();

	return <div>{isSearching && searchTerm && `Searching for ${searchTerm}...`}</div>;
};

export default DocumentResults;
