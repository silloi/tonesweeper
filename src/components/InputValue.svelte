<script lang="ts">
	import { parseIntFromDuodecimal, stringifyIntToDuodecimal } from '$lib/duodecimal';

	export let value: number | null;

	$: literal = stringifyIntToDuodecimal(value);

	const handleKeydown = (event: KeyboardEvent) => {
		const valueOrZero = value ?? 0;
		if (event.key === 'ArrowUp') {
			value = valueOrZero + 1;
		} else if (event.key === 'ArrowDown') {
			value = valueOrZero - 1;
		}
	};

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const targetValue = target.value;
		const parsed = parseIntFromDuodecimal(targetValue);
		value = parsed;
	};
</script>

<input type="text" bind:value={literal} on:keydown={handleKeydown} on:change={handleChange} />
<input type="hidden" bind:value />

<style>
	input[type='text'] {
		width: 20px;
		font-size: 1rem;
		text-align: right;
	}
</style>
