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

function validateTimestamp(timestamp) {
	const reg = /^[0-9\b:]+$/;

	if (!reg.test(timestamp)) {
		console.error('Invalid timestamp: timestamp may only have colons or numbers');
		return {err: 'Times may only have colons or numbers'};
	}

	const timestampSplit = timestamp.split(':');

	if (timestampSplit.length > 2) {
		console.error('Invalid timestamp: timestamp may only have one colon');
		return {err: 'Time may only have one colon'};
	}

	if (timestampSplit.length > 1) {
		if (parseInt(timestampSplit[1]) > 59) {
			console.error('Invalid timestamp: minutes value may not exceed 60');
			return {err: 'Minutes value may not exceed 60'};
		}

		if (timestampSplit[1].length > 2) {
			console.error('Invalid timestamp: minutes may not exceed three characters');
			return {err: 'Minutes may not exceed three characters'};
		}
	}

	return true;
}

function timeStampToMinutes(text) {
	if (validateTimestamp(text).err) {
		console.error('Failed to convert timestamp to minutes: invalid timestamp');
		return;
	}

	const textSplit = text.split(':');

	if (textSplit.length === 1) {
		return parseInt(textSplit[0]);
	}

	return parseInt(textSplit[0]) * 60 + parseInt(textSplit[1]);
}

function minutesToTimeStamp(minutes) {
	let minuteValue = minutes % 60,
		hourValue = (minutes - minuteValue) / 60;

	if (minuteValue === 0) {
		minuteValue = '00';
	}

	return `${hourValue}:${minuteValue}`;
}



export {
	getHoursMinutes,
	timeStampToMinutes,
	minutesToTimeStamp,
	validateTimestamp
};