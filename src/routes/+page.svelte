<script>
	import Cell from '../components/Cell.svelte';
	import Stats from '../components/Stats.svelte';

	let offset = 60;
	let matrix = [
		[0, 4, 7, 4, 0, 4, 7, 4],
		[5, 9, 12, 9, 5, 9, 12, 9]
	];

	const play = () => {};
</script>

<h1>Tone Sweeper</h1>

<div>
	<input type="number" bind:value={offset} />
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
					<Cell value={cell} />
				{/each}
				<Stats {row} />
			</tr>
		{/each}
	</table>
</div>

<div>
	<button type="button" on:click={play}>Play</button>
</div>
