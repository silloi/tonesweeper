<script lang="ts">
	import * as Tone from 'tone';

	import Cell from '../components/Cell.svelte';
	import Stats from '../components/Stats.svelte';

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
		[14, 12, 11, 9, 7, 7, 7, 7],
		[12, 12, 16, 12, 7, 7, 7, 7],
		[16, 16, 19, 16, 12, 12, 16, 12],
		[14, 11, 12, 9, 11, 7, 9, 6],
		[7, 9, 11, 12, 14, 16, 18, 19]
	];

	let offset = 60;
	let matrix = sonatine;

	const play = () => {
		const synth = new Tone.Synth().toDestination();
		const now = Tone.now();

		matrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				const keyNum = cell + offset;
				const time = now + rowIndex * 1 + cellIndex * 0.125;
				synth.triggerAttackRelease(convertNumberToTone(keyNum), '16n', time);
			});
		});
	};
</script>

<h1>Tone Sweeper</h1>

<div>
	+ <input type="number" bind:value={offset} />
</div>

<div>
	<table>
		<thead>
			<tr>
				{#each new Array(8) as _, index}
					<td>{index}</td>
				{/each}
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
	</table>
</div>

<div>
	<button type="button" on:click={play}>Play</button>
</div>
