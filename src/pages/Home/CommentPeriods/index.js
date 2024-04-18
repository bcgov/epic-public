import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import CommentPeriodResults from "./Results.js";

import { HOME_TAB_KEYS } from "constants/home";

const CommentPeriods = () => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.PUBLIC_COMMENT_PERIODS}>
				<Search title="Public Comment Periods" placeholder="Search by keywords for Project Name" />
				<CommentPeriodResults />
			</SearchProvider>
		</div>
	);
};

export default CommentPeriods;
