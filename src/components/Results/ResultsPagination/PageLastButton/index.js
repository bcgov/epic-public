import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { IconButton } from "@mui/material";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

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

const PageLastButton = (props) => {
	const { handleChangePage, pageNum, pageSize, totalResultCount } = props;
	const [isDisabled, setIsDisabled] = useState(true);
	const { classes } = useStyles();

	// set to last page
	const handleOnClick = (event) => {
		handleChangePage(event, Math.ceil(totalResultCount / pageSize) - 1);
	};

	useEffect(() => {
		setIsDisabled(pageNum === Math.ceil(totalResultCount / pageSize) - 1);
	}, [pageNum, pageSize, setIsDisabled, totalResultCount]);

	return (
		<div className={classes.container}>
			<IconButton aria-label="last" disabled={isDisabled} onClick={handleOnClick} type="button">
				<KeyboardDoubleArrowRightIcon />
			</IconButton>
		</div>
	);
};

PageLastButton.propTypes = {
	handleChangePage: PropTypes.func,
	pageNum: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	totalResultCount: PropTypes.number.isRequired,
};

export default PageLastButton;
