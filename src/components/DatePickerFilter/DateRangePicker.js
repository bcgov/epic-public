import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";

import { Box, Divider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import RangeDay from "./RangeDay";

import { addDays, formatDateLongMonth, subtractDays } from "services/date";

const useStyles = makeStyles()(() => ({
	label: {
		borderBottom: "1px solid #E9EAEC",
		display: "flex",
		justifyContent: "space-around",
		padding: "1rem 0 1rem 0",
		position: "relative",
		"& svg": {
			color: "#6d6d6d",
			position: "absolute",
			textAlign: "center",
		},
	},
	calendars: {
		alignItems: "center",
		display: "flex",
	},
}));

const DateRangePicker = ({ endDate, setEndDate, setStartDate, startDate }) => {
	const { classes } = useStyles();

	const handleStartDateChange = (date) => {
		if (!endDate || date > endDate) {
			setEndDate(addDays(date, 7));
		}
		setStartDate(date);
	};

	const handleEndDateChange = (date) => {
		if (!startDate) {
			setStartDate(subtractDays(date, 7));
		}
		setEndDate(date);
	};

	return (
		<div className={classes.container}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				{startDate && endDate && (
					<div aria-label="Date range label" className={classes.label}>
						<div>{`${formatDateLongMonth(startDate)}`}</div>
						<TrendingFlatIcon />
						<div>{`${formatDateLongMonth(endDate)}`}</div>
					</div>
				)}
				<Box className={classes.calendars}>
					<DateCalendar
						aria-label="Select start date"
						onChange={handleStartDateChange}
						showDaysOutsideCurrentMonth
						slots={{
							day: RangeDay,
						}}
						slotProps={{
							day: {
								endDate: endDate,
								rangeBoundary: startDate,
								startDate: startDate,
							},
						}}
						value={startDate}
						views={["year", "month", "day"]}
					/>
					<Divider orientation="vertical" flexItem />
					<DateCalendar
						aria-label="Select end date"
						minDate={startDate}
						onChange={handleEndDateChange}
						showDaysOutsideCurrentMonth
						slots={{
							day: RangeDay,
						}}
						slotProps={{
							day: {
								endDate: endDate,
								rangeBoundary: endDate,
								startDate: startDate,
							},
						}}
						value={endDate}
						views={["year", "month", "day"]}
					/>
				</Box>
			</LocalizationProvider>
		</div>
	);
};

DateRangePicker.propTypes = {
	endDate: PropTypes.object,
	setEndDate: PropTypes.func.isRequired,
	setStartDate: PropTypes.func.isRequired,
	startDate: PropTypes.object,
};

export default DateRangePicker;
