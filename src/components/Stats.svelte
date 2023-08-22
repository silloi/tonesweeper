<script lang="ts">
	export let row: number[] = [];

	const max = (list: number[]) => Math.max(...list);
	const min = (list: number[]) => Math.min(...list);
	// const sum = (list: number[]) => list.reduce((num, sum) => sum += num);
	const mean = (list: number[]) =>
		Math.floor(list.reduce((num, mean) => (mean += num / list.length)));
</script>

<td>
	<span>
		{max(row)}
	</span>
</td>
<td>
	<span>
		{min(row)}
	</span>
</td>
<td>
	<span>
		{mean(row)}
	</span>
</td>
