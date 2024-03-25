import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import { HOME_TAB_KEYS } from "constants";

const Updates = () => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.PROJECTS}>
				<Search />
			</SearchProvider>
		</div>
	);
};
export default Updates;
