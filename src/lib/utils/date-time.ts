import { intervalToDuration, formatDistance } from 'date-fns';

const zeroPad = (num: number | undefined) => String(num).padStart(2, '0');

export const formatToMmss = (seconds: number) => {
	if (!seconds) {
		return '0:00';
	}
	const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
	const formatted = `${duration.minutes}:${zeroPad(duration.seconds)}`;
	return formatted;
};

export const findTimeDifference = (time: string) => {
	const getSeconds = (dateString: Date) => dateString.getTime() / 1000;

	const gameEnd = getSeconds(new Date());
	const gameStart = getSeconds(new Date(time));

	const diff = gameEnd - gameStart;
	const minutes = Math.floor(diff / 60);

	return minutes;
};
