import { useQuery } from "@tanstack/react-query";

import { MILLISECONDS_IN_HOUR } from "./constants";
import { getPcps } from "./endpoints";

const cacheKey = "pcps";

const queryPcps = async ({ queryKey: [_, searchTerm, selectedFilters, tableParameters] }) => {
	const { data } = await getPcps(searchTerm, selectedFilters, tableParameters);
	return data;
};

const usePcps = (searchTerm, selectedFilters, tableParameters, { enabled = true } = {}) => {
	const pcpQuery = useQuery({
		enabled: !!enabled,
		queryFn: queryPcps,
		queryKey: [cacheKey, searchTerm, selectedFilters, tableParameters],
		staleTime: MILLISECONDS_IN_HOUR,
	});
	return pcpQuery;
};

export default usePcps;
