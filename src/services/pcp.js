import { isAfterDate, isBetweenDates } from "services/date";

export const getStatus = (dateStarted, dateCompleted) => {
	if (dateStarted && dateCompleted) {
		if (isBetweenDates(new Date(), dateStarted, dateCompleted)) {
			return "Open";
		}
		if (isAfterDate(new Date(), dateCompleted)) {
			return "Closed";
		}
		return "Upcoming";
	}
};
