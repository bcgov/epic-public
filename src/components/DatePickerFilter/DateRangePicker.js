import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";

import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import RangeDay from "./RangeDay";

import { addDays, formatDateLongMonth, subtractDays } from "services/date";

const useStyles = makeStyles()(() => ({
	label: {
		display: "flex",
		justifyContent: "space-around",
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
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{startDate && endDate && (
				<div className={classes.label}>
					<div>{`${formatDateLongMonth(startDate)}`}</div>
					<div>{`${formatDateLongMonth(endDate)}`}</div>
				</div>
			)}
			<Box display="flex" alignItems="center" gap={2}>
				<DateCalendar
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
				<DateCalendar
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
	);
};

DateRangePicker.propTypes = {
	endDate: PropTypes.object,
	setEndDate: PropTypes.func.isRequired,
	setStartDate: PropTypes.func.isRequired,
	startDate: PropTypes.object,
};

export default DateRangePicker;
