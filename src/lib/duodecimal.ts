export const parseIntFromDuodecimal = (str: string): number | null => {
	if (str.length === 0) return null;
	if (!'0123456789ABCDEF'.includes(str[str.length - 1].toUpperCase())) return null;
	if (str[str.length - 2] && !'-0123456789ABCDEF'.includes(str[str.length - 2].toUpperCase()))
		return null;

	return parseInt(str, 12);
};

export const stringifyIntToDuodecimal = (num: number | null): string => {
	return num !== null ? num.toString(12).toUpperCase() : '';
};
