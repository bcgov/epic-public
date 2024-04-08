import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import DocumentResults from "./Results";

import { HOME_TAB_KEYS } from "constants/home";

const Documents = () => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.DOCUMENTS}>
				<Search />
				<DocumentResults />
			</SearchProvider>
		</div>
	);
};

export default Documents;
