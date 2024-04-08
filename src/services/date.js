const _format = (date, options = {}) => new Intl.DateTimeFormat("en-US", options).format(date);

const _isValidDate = (date) => date instanceof Date && !isNaN(date);

const _getValidDate = (dateOrString, caller = "") => {
	const date = new Date(dateOrString);
	if (_isValidDate(date)) return date;

	throw new Error(`date service: ${caller}: invalid date: ${dateOrString}`);
};

export const addDays = (dateOrString, days = 0) => {
	const date = _getValidDate(dateOrString, "addDays");

	date.setDate(date.getDate() + days);

	return date;
};

export const formatDateLongMonth = (dateOrString = new Date()) => {
	const date = _getValidDate(dateOrString, "formatDateLongMonth");

	return _format(date, { day: "numeric", month: "long", year: "numeric" });
};

export const formatDateOnlyISO = (dateOrString = new Date()) => {
	const date = _getValidDate(dateOrString, "formatDateOnlyISO");

	return date.toISOString().substring(0, 10);
};

export const formatDateShortMonth = (dateOrString = new Date()) => {
	const date = _getValidDate(dateOrString, "formatDateShortMonth");

	return _format(date, { day: "numeric", month: "short", year: "numeric" });
};

export const isAfterDate = (dateOrString, dateOrString2 = new Date()) => {
	const date = _getValidDate(dateOrString, "isAfterDate");
	const date2 = _getValidDate(dateOrString2, "isAfterDate");

	return date > date2;
};

export const isBetweenDates = (dateOrString, beforeDateOrString, afterDateOrString) => {
	const date = _getValidDate(dateOrString, "isBetweenDates");
	const beforeDate = _getValidDate(beforeDateOrString, "isBetweenDates");
	const afterDate = _getValidDate(afterDateOrString, "isBetweenDates");

	return date >= beforeDate && date <= afterDate;
};

export const isValidDate = (dateOrString) => _isValidDate(dateOrString);

export const subtractDays = (dateOrString, days = 0) => {
	const date = _getValidDate(dateOrString, "subtractDays");

	date.setDate(date.getDate() - days);

	return date;
};
