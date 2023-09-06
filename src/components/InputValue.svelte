<script lang="ts">
	import * as Tone from 'tone';
	import { convertNumberToTone } from '$lib/convert';
	import {
		parseIntFromDuodecimal,
		stringifyIntToDuodecimal,
		stringifyIntToScientificAlphabet
	} from '$lib/duodecimal';

	export let value: number | null;
	export let offset: number | null;
	export let viewMode = 'duodecimal';

	$: literal =
		viewMode === 'duodecimal'
			? stringifyIntToDuodecimal(value)
			: viewMode === 'scientific'
			? stringifyIntToScientificAlphabet(value && offset ? value + offset : null)
			: null;

	const handleKeydown = (event: KeyboardEvent) => {
		const valueOrZero = value ?? 0;
		if (event.shiftKey && event.key === 'ArrowUp') {
			value = valueOrZero + 12;
		} else if (event.shiftKey && event.key === 'ArrowDown') {
			value = valueOrZero - 12;
		} else if (event.key === 'ArrowUp') {
			value = valueOrZero + 1;
		} else if (event.key === 'ArrowDown') {
			value = valueOrZero - 1;
		}

		play(value, offset);
	};

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const targetValue = target.value;
		const parsed = parseIntFromDuodecimal(targetValue);
		value = parsed;

		play(value, offset);
	};

	const play = (value: number | null, offset: number | null) => {
		const synth = new Tone.Synth().toDestination();

		const keyNum = value !== null && offset ? value + offset : null;
		keyNum && synth.triggerAttackRelease(convertNumberToTone(keyNum), '16n');
	};
</script>

<input type="text" bind:value={literal} on:keydown={handleKeydown} on:input={handleInput} />
<input type="hidden" bind:value />

<style>
	input[type='text'] {
		width: 32px;
		font-size: 1rem;
		text-align: right;
	}
</style>
