import { useQuery } from "@tanstack/react-query";

import { MILLISECONDS_IN_HOUR } from "./constants";
import { getLists } from "./endpoints";

const cacheKey = "lists";

const queryLists = async ({ queryKey: [_] }) => {
	const { data } = await getLists();
	return data;
};

const useLists = ({ enabled = true } = {}) => {
	const listsQuery = useQuery({
		enabled: !!enabled,
		queryFn: queryLists,
		queryKey: [cacheKey],
		staleTime: MILLISECONDS_IN_HOUR,
	});

	return listsQuery;
};

export default useLists;
