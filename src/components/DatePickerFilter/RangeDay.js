import PropTypes from "prop-types";

import { styled } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
	"&.inSelectedRange": {
		backgroundColor: "#D9D9D9",
		"&.MuiPickersDay-dayOutsideMonth": {
			backgroundColor: "#F1F1F1",
		},
	},
	"&.Mui-selected": {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
}));

const RangeDay = ({ day, endDate, outsideCurrentMonth, rangeBoundary, startDate, ...other }) => {
	const isDateInRange = (date, startDate, endDate) => {
		if (!startDate || !endDate) return false;
		return date >= startDate && date <= endDate;
	};

	const className = isDateInRange(day, startDate, endDate) ? "inSelectedRange" : "outOfSelectedRange";
	const isSelected = !outsideCurrentMonth && (rangeBoundary ? day.getTime() === rangeBoundary.getTime() : false);

	return (
		<HighlightedDay
			className={className}
			day={day}
			outsideCurrentMonth={outsideCurrentMonth}
			selected={isSelected}
			{...other}
		/>
	);
};

RangeDay.propTypes = {
	day: PropTypes.object.isRequired,
	endDate: PropTypes.object,
	outsideCurrentMonth: PropTypes.bool.isRequired,
	rangeBoundary: PropTypes.object,
	startDate: PropTypes.object,
};

export default RangeDay;
