<script lang="ts">
	import * as Tone from 'tone';

	import Cell from '../components/Cell.svelte';
	import Stats from '../components/Stats.svelte';
	import InputValue from '../components/InputValue.svelte';

	const PITCH_CLASS_TO_ALPHABET = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	const convertNumberToTone = (keyNum: number) => {
		const octave = Math.floor((keyNum - 12) / 12);
		const pitchClass = keyNum % 12;
		const tone = `${PITCH_CLASS_TO_ALPHABET[pitchClass]}${octave}`;
		return tone;
	};

	let sonatine = [
		[12, 12, 16, 12, 7, 7, 7, 7],
		[12, 12, 16, 12, 7, 7, 19, 19],
		[17, 16, 14, 12, 11, 12, 11, 12],
		[14, 12, 11, 9, 7, 7, 7, 7]
		// [12, 12, 16, 12, 7, 7, 7, 7],
		// [16, 16, 19, 16, 12, 12, 16, 12],
		// [14, 11, 12, 9, 11, 7, 9, 6],
		// [7, 9, 11, 12, 14, 16, 18, 19]
	];

	let offset = 60;
	let matrix = sonatine;

	const play = () => {
		const synth = new Tone.Synth().toDestination();
		const now = Tone.now();

		matrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				const toneNum = cell;
				const offsetNum = offset;
				if (toneNum && offsetNum) {
					const keyNum = toneNum + offsetNum;
					const time = now + rowIndex * 1 + cellIndex * 0.125;
					synth.triggerAttackRelease(convertNumberToTone(keyNum), '16n', time);
				}
			});
		});
	};

	const addRows = () => {
		matrix = [
			...matrix,
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null),
			new Array(8).fill(null)
		];
		console.log('matrix', matrix);
	};
</script>

<h1>Tone Sweeper</h1>

<main>
	<section>
		<div>
			<span>+</span>
			<InputValue bind:value={offset} />
		</div>
		<div>
			<button type="button" on:click={play}>Play</button>
		</div>
	</section>

	<table>
		<thead>
			<tr>
				<td colspan="8" />
				<td>Max</td>
				<td>Min</td>
				<td>Mean</td>
			</tr>
		</thead>
		{#each matrix as row}
			<tr>
				{#each row as cell}
					<Cell bind:value={cell} />
				{/each}
				<Stats {row} />
			</tr>
		{/each}
		<tr>
			<td colspan="8">
				<button type="button" on:click={addRows}>Add Rows</button>
			</td>
		</tr>
	</table>
</main>

<style>
	section {
		display: flex;
		justify-content: space-between;
		width: 256px;
	}
</style>
