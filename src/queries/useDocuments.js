import { useQuery } from "@tanstack/react-query";

import { MILLISECONDS_IN_HOUR } from "./constants";
import { getDocuments } from "./endpoints";

const cacheKey = "documents";

const queryDocuments = async ({ queryKey: [_, searchTerm, selectedFilters, tableParameters] }) => {
	const { data } = await getDocuments(searchTerm, selectedFilters, tableParameters);
	return data;
};

const useDocuments = (searchTerm, selectedFilters, tableParameters, { enabled = true } = {}) => {
	const documentsQuery = useQuery({
		enabled: !!enabled,
		queryFn: queryDocuments,
		queryKey: [cacheKey, searchTerm, selectedFilters, tableParameters],
		staleTime: MILLISECONDS_IN_HOUR,
	});
	return documentsQuery;
};

export default useDocuments;
