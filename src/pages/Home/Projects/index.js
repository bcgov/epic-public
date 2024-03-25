import PropTypes from "prop-types";

import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import ProjectResults from "./ProjectResults";

import { HOME_TAB_KEYS } from "constants";

const Projects = ({ setShowUpdates }) => {
	const handleShowUpdates = (searching) => {
		setShowUpdates(!searching);
	};

	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.PROJECTS}>
				<Search title="Projects" />
				<ProjectResults onSearch={handleShowUpdates} />
			</SearchProvider>
		</div>
	);
};
ProjectResults.propTypes = {
	setShowUpdates: PropTypes.func,
};
export default Projects;
