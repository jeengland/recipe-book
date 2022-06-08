function getHoursMinutes(minutes) {
	const minuteVal = minutes % 60,
		hourVal = (minutes - minuteVal) / 60,
		minuteString = minuteVal ? `${minuteVal} minute${minuteVal === 1 ? '' : 's'}` : '',
		hourString = hourVal ? `${hourVal} hour${hourVal === 1 ? '' : 's'}` : '';

	if (minuteString && hourString) {
		return hourString + ', ' + minuteString;
	}

	if (minuteString) {
		return minuteString;
	}

	if (hourString) {
		return hourString;
	}
	
	console.error('Invalid minutes value', minutes);
	return undefined;
}

export {
	getHoursMinutes
};