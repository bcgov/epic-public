import PropTypes from "prop-types";

import { SearchProvider } from "contexts/Search";

import Search from "components/Search";

import ProjectResults from "./Results";

import { HOME_TAB_KEYS } from "constants/home";

const Projects = ({ onShowUpdates }) => {
	return (
		<div>
			<SearchProvider tabKey={HOME_TAB_KEYS.PROJECTS}>
				<Search title="Projects" />
				<ProjectResults onSearch={(searching) => onShowUpdates(!searching)} />
			</SearchProvider>
		</div>
	);
};

ProjectResults.propTypes = {
	onShowUpdates: PropTypes.func,
};

export default Projects;
