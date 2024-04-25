import { useQuery } from "@tanstack/react-query";

import { MILLISECONDS_IN_HOUR } from "./constants";
import { getUpdates } from "./endpoints";

const cacheKey = "updates";

const queryUpdates = async ({ queryKey: [_, searchTerm, selectedFilters, tableParameters] }) => {
	const { data } = await getUpdates(searchTerm, selectedFilters, tableParameters);
	return data;
};

const useUpdates = (searchTerm, selectedFilters, tableParameters, { enabled = true } = {}) => {
	const updatesQuery = useQuery({
		enabled: !!searchTerm && !!enabled,
		queryFn: queryUpdates,
		queryKey: [cacheKey, searchTerm, selectedFilters, tableParameters],
		staleTime: MILLISECONDS_IN_HOUR,
	});
	return updatesQuery;
};

export default useUpdates;
