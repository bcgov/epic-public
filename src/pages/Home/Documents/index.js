import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import DocumentResults from "./Results";

import { HOME_TAB_KEYS } from "constants/home";

const Documents = () => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.DOCUMENTS}>
				<Search
					title="Documents"
					placeholder="Search by keywords for Document Types, Document Author, Date Range, and Project Phase"
				/>
				<DocumentResults />
			</SearchProvider>
		</div>
	);
};

export default Documents;
