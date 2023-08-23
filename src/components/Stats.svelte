<script lang="ts">
	import { stringifyIntToDuodecimal } from '$lib/duodecimal';

	export let row: (number | null)[] = [];

	$: validRow = row.filter((num) => num !== null) as number[];

	const max = (list: number[]) => Math.max(...list);
	const min = (list: number[]) => Math.min(...list);
	// const sum = (list: number[]) => list.reduce((num, sum) => sum += num);
	const mean = (list: number[]) =>
		list.length ? Math.floor(list.reduce((acc, num) => acc + num / list.length, 0)) : null;

	const guardInfinity = (num: number) => (Math.abs(num) === Infinity ? null : num);
</script>

<td>
	<span>
		{stringifyIntToDuodecimal(guardInfinity(max(validRow)))}
	</span>
</td>
<td>
	<span>
		{stringifyIntToDuodecimal(guardInfinity(min(validRow)))}
	</span>
</td>
<td>
	<span>
		{stringifyIntToDuodecimal(mean(validRow))}
	</span>
</td>

<style>
	td {
		text-align: right;
	}
</style>
