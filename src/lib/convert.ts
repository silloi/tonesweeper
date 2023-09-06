import { PITCH_CLASS_TO_ALPHABET } from '$lib/constants';

export const convertNumberToTone = (keyNum: number) => {
	const octave = Math.floor((keyNum - 12) / 12);
	const pitchClass = keyNum % 12;
	const tone = `${PITCH_CLASS_TO_ALPHABET[pitchClass]}${octave}`;
	return tone;
};
