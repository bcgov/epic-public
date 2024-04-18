import { useQuery } from "@tanstack/react-query";

import { MILLISECONDS_IN_HOUR } from "./constants";
import { getProjects } from "./endpoints";

const cacheKey = "projects";

const queryProjects = async ({ queryKey: [_, searchTerm, selectedFilters, tableParameters] }) => {
	const { data } = await getProjects(searchTerm, selectedFilters, tableParameters);
	return data;
};

const useProjects = (searchTerm, selectedFilters, tableParameters, { enabled = true } = {}) => {
	const projectQuery = useQuery({
		enabled: !!enabled,
		queryFn: queryProjects,
		queryKey: [cacheKey, searchTerm, selectedFilters, tableParameters],
		staleTime: MILLISECONDS_IN_HOUR,
	});
	return projectQuery;
};

export default useProjects;
