import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";

import Filters from "./Filters";
import SearchBar from "./SearchBar";

const useStyles = makeStyles()((theme) => ({
	container: {
		background: "radial-gradient(circle, #145185 0%, #152D46 100%)",
		color: "white",
		padding: "0 3rem 2rem 3rem",
	},
	header: {
		margin: 0,
		paddingTop: "1rem",
	},
}));

const Search = ({ title, placeholder }) => {
	const { classes } = useStyles();

	return (
		<div className={classes.container}>
			<h2 className={classes.header}>{title && `Search ${title}`}&nbsp;</h2>
			<SearchBar placeholder={placeholder} />
			<Filters />
		</div>
	);
};

Search.propTypes = {
	placeholder: PropTypes.string,
	title: PropTypes.string,
};

export default Search;
