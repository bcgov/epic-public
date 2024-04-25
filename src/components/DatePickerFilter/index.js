import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import DateRangePicker from "./DateRangePicker";

import { formatDateOnlyISO, formatDateShortMonth } from "services/date";

const useStyles = makeStyles()((theme, { width }) => ({
	filter: {
		color: "white",
		flex: 1,
	},
	menuButton: {
		alignItems: "center",
		background: theme.palette.common.white,
		border: "1px",
		borderRadius: "0.25rem",
		color: theme.palette.grey.dark,
		display: "flex",
		fontSize: "1rem",
		fontWeight: 700,
		justifyContent: "space-between",
		minWidth: "15rem",
		width: "100%",
		"& >div": {
			alignItems: "center",
			display: "flex",
			gap: "1rem",
		},
		"& svg": {
			height: "1.875rem",
			width: "1.875rem",
		},
		"&:disabled": {
			opacity: 0.7,
		},
		"&.base--expanded": {
			borderBottom: "none",
			borderRadius: "0.25rem 0.25rem 0 0",
		},
	},
	menu: {
		background: theme.palette.common.white,
		boxShadow: "2px 6px 8px 0px #0000001A",
		border: "1px solid #EEEEEE",
		borderRadius: "0.25rem",
		width: width,
		minWidth: "595px",
		overflowY: "auto",
		maxHeight: "500px",
		"& ul": {
			listStyleType: "none",
			padding: 0,
			margin: 0,
		},
	},
}));

const DatePickerFilter = ({
	endDate,
	filterKey,
	icon,
	onChange,
	selected,
	setEndDate,
	setStartDate,
	startDate,
	title,
}) => {
	const [keys, setKeys] = useState(selected.map(({ key }) => key));
	const [open, setOpen] = useState(false);
	const [width, setWidth] = useState(0);
	const { classes } = useStyles({ width });

	const keysRef = useRef(selected);
	const selectedRef = useRef(selected);

	const menuButtonRef = useCallback((node) => {
		if (!node) return;
		setWidth(node.clientWidth);
	}, []);

	useEffect(() => {
		if (selectedRef.current.length === selected.length) return;
		selectedRef.current = selected;

		if (selectedRef.current.length === 0) {
			setStartDate(null);
			setEndDate(null);
		}

		if (keysRef.current.length === selected.length) return;

		setKeys(selected.map(({ key }) => key));
	}, [selected, setEndDate, setStartDate]);

	useEffect(() => {
		if (keysRef.current.length === keys.length) return;
		keysRef.current = keys;

		if (!startDate || !endDate) return;
		const items = [];
		items.push({
			description: `${formatDateShortMonth(startDate)} to ${formatDateShortMonth(endDate)}`,
			key: `${formatDateOnlyISO(startDate)},${formatDateOnlyISO(endDate)}`,
			filterKey,
		});
		onChange(items);
	}, [endDate, startDate, keys, onChange, filterKey]);

	useEffect(() => {
		if (startDate && endDate) {
			setKeys((keys) => (keys.includes(filterKey) ? keys.filter((val) => val !== filterKey) : [...keys, filterKey]));
		}
	}, [endDate, filterKey, setKeys, startDate]);

	const onToggle = () => setOpen((val) => !val);

	return (
		<div className={classes.filter}>
			<Dropdown open={open}>
				<MenuButton
					aria-label={`Select ${title}`}
					className={classes.menuButton}
					onClick={onToggle}
					ref={menuButtonRef}
				>
					<div>
						{icon && <div>{icon}</div>}
						<div>{title}</div>
					</div>
					{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</MenuButton>
				<Menu aria-label="Date Range Picker" className={classes.menu}>
					<DateRangePicker
						endDate={endDate}
						setEndDate={setEndDate}
						setStartDate={setStartDate}
						startDate={startDate}
					/>
				</Menu>
			</Dropdown>
		</div>
	);
};

DatePickerFilter.propTypes = {
	endDate: PropTypes.object,
	filterKey: PropTypes.string,
	icon: PropTypes.element,
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf(PropTypes.object).isRequired,
	setEndDate: PropTypes.func.isRequired,
	setStartDate: PropTypes.func.isRequired,
	startDate: PropTypes.object,
	title: PropTypes.string.isRequired,
};

export default DatePickerFilter;
