const encodeFilename = (filename) => {
	const regex = /[()\\/ ]/g;
	return filename.replace(regex, (match) => {
		switch (match) {
			case "(":
				return "%28";
			case ")":
				return "%29";
			case "\\":
				return "_";
			case "/":
				return "_";
			case " ":
				return "_";
			default:
				return match;
		}
	});
};

const encodeUrl = (url) => {
	return encodeURIComponent(url).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);
};

export const encodeString = (filename, isUrl) => {
	return isUrl ? encodeUrl(filename) : encodeFilename(filename);
};
