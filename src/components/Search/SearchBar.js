import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { makeStyles } from "tss-react/mui";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useSearch } from "contexts/Search";

const useStyles = makeStyles()((theme) => ({
	container: {
		color: "white",
		display: "flex",
		border: "1px solid #eeeeee",
		borderRadius: "4px",
		boxShadow: "2px 6px 8px 0px #0000001A",
	},
	clearButton: {
		color: theme.palette.text.primary,
		fontSize: "1.25rem",
		marginLeft: "1rem",
	},
	searchButton: {
		borderRadius: "0 3px 3px 0",
		fontSize: "1rem",
		fontWeight: 700,
		padding: "0 2rem",
		textTransform: "none",
	},
	searchIcon: {
		color: theme.palette.grey.main,
		fontSize: "2.5rem",
		marginRight: "1rem",
	},
	textField: {
		background: theme.palette.common.white,
		border: "none",
		borderRadius: "3px 0 0 3px",
		width: "100%",
		"& .MuiInputBase-root": {
			borderRadius: "0px",
			height: "3rem",
			"& fieldset": {
				display: "none",
			},
		},
	},
}));

const SearchBar = ({ placeholder }) => {
	const { classes } = useStyles();

	const { isSearching, onSearch, onSearchTermChange, searchTerm } = useSearch();

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [searchTerm]);

	return (
		<div className={classes.container}>
			<TextField
				autoFocus
				className={classes.textField}
				disabled={isSearching}
				InputProps={{
					endAdornment: (
						<IconButton
							aria-label="clear search term"
							className={classes.clearButton}
							onClick={() => onSearchTermChange("")}
						>
							<CancelOutlinedIcon fontSize="small" />
						</IconButton>
					),
					onKeyDown: ({ code }) => code === "Enter" && onSearch(),
					startAdornment: <SearchIcon className={classes.searchIcon} />,
				}}
				inputRef={inputRef}
				onChange={({ target: { value = "" } = {} }) => onSearchTermChange(value)}
				placeholder={placeholder}
				value={searchTerm}
			/>
			<Button
				className={classes.searchButton}
				color="secondary"
				disabled={!searchTerm || isSearching}
				onClick={onSearch}
				variant="contained"
			>
				Search
			</Button>
		</div>
	);
};

SearchBar.propTypes = {
	placeholder: PropTypes.string,
};

export default SearchBar;
