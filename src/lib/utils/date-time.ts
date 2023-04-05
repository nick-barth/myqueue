import { intervalToDuration } from 'date-fns';

const zeroPad = (num: number | undefined) => String(num).padStart(2, '0');

export const formatToMmss = (seconds: number) => {
	if (!seconds) {
		return '00:00';
	}
	const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
	const formatted = `${duration.minutes}:${zeroPad(duration.seconds)}`;
	return formatted;
};
