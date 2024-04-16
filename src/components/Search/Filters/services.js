import DateRangeFilter from "./DateRangeFilter";
import DocumentAuthorsFilter from "./DocumentAuthorsFilter";
import DocumentTypesFilter from "./DocumentTypesFilter";
import ProjectPhasesFilter from "./ProjectPhasesFilter";
import ProjectRegionsFilter from "./ProjectRegionsFilter";
import ProjectTypesFilter from "./ProjectTypesFilter";
import ProponentsFilter from "./ProponentsFilter";
import StatusFilter from "./StatusFilter";
import UpdateTypesFilter from "./UpdateTypesFilter";

import { FILTER_KEYS } from "constants/filters";

export const getFilterComponent = (filterKey) => {
	switch (filterKey) {
		case FILTER_KEYS.DATE_RANGE:
			return <DateRangeFilter key={filterKey} />;
		case FILTER_KEYS.DOCUMENT_AUTHORS:
			return <DocumentAuthorsFilter key={filterKey} />;
		case FILTER_KEYS.DOCUMENT_TYPES:
			return <DocumentTypesFilter key={filterKey} />;
		case FILTER_KEYS.DOCUMENT_PROJECT_PHASES:
			return <ProjectPhasesFilter key={filterKey} filterKey={filterKey} />;
		case FILTER_KEYS.PROJECT_PHASES:
			return <ProjectPhasesFilter key={filterKey} filterKey={filterKey} />;
		case FILTER_KEYS.PROJECT_REGIONS:
			return <ProjectRegionsFilter key={filterKey} />;
		case FILTER_KEYS.PROJECT_TYPES:
			return <ProjectTypesFilter key={filterKey} />;
		case FILTER_KEYS.PROPONENTS:
			return <ProponentsFilter key={filterKey} />;
		case FILTER_KEYS.STATUS:
			return <StatusFilter key={filterKey} />;
		case FILTER_KEYS.UPDATE_TYPES:
			return <UpdateTypesFilter key={filterKey} />;
		default:
			return null;
	}
};
