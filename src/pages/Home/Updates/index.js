import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import UpdatesResults from "./Results";

import { HOME_TAB_KEYS } from "constants/home";

const Updates = () => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.UPDATES}>
				<Search title="Updates" placeholder="Search by keywords for Project Name" />
				<UpdatesResults />
			</SearchProvider>
		</div>
	);
};
export default Updates;
