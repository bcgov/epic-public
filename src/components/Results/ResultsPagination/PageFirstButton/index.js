import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { IconButton } from "@mui/material";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const useStyles = makeStyles()((theme) => ({
	container: {
		"& button": {
			borderRadius: "0.25rem",
			height: "1.75rem",
			padding: "0",
			"& svg": {
				fontSize: "1.75rem",
				color: theme.palette.text.primary,
			},
		},
	},
}));

const PageFirstButton = (props) => {
	const { handleChangePage, pageNum } = props;
	const [isDisabled, setIsDisabled] = useState(true);
	const { classes } = useStyles();

	// set to first page
	const handleOnClick = (event) => {
		handleChangePage(event, 0);
	};

	useEffect(() => {
		setIsDisabled(pageNum === 0);
	}, [pageNum, setIsDisabled]);

	return (
		<div className={classes.container}>
			<IconButton aria-label="first" disabled={isDisabled} onClick={handleOnClick} type="button">
				<KeyboardDoubleArrowLeftIcon />
			</IconButton>
		</div>
	);
};

PageFirstButton.propTypes = {
	handleChangePage: PropTypes.func,
	pageNum: PropTypes.number.isRequired,
};

export default PageFirstButton;
