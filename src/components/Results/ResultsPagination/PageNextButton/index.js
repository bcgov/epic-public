import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { IconButton } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
	container: {
		"& button": {
			borderRadius: "0.25rem",
			color: theme.palette.text.primary,
			fontSize: "0.875rem",
			padding: "0.375rem 0.5rem",
		},
	},
}));

const PageNextButton = (props) => {
	const { handleChangePage, label, pageNum, pageSize, totalResultCount } = props;
	const [isDisabled, setIsDisabled] = useState(true);
	const { classes } = useStyles();

	// set to next page
	const handleOnClick = (event) => {
		handleChangePage(event, pageNum + 1);
	};

	useEffect(() => {
		setIsDisabled(pageNum === Math.ceil(totalResultCount / pageSize) - 1);
	}, [pageNum, pageSize, setIsDisabled, totalResultCount]);

	return (
		<div className={classes.container}>
			<IconButton aria-label={label} disabled={isDisabled} onClick={handleOnClick} type="button">
				{label}
			</IconButton>
		</div>
	);
};

PageNextButton.propTypes = {
	handleChangePage: PropTypes.func,
	label: PropTypes.string.isRequired,
	pageNum: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	totalResultCount: PropTypes.number.isRequired,
};

export default PageNextButton;
