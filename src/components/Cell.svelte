<script lang="ts">
	import InputValue from './InputValue.svelte';

	export let value: number | null;
	export let offset: number;
	export let viewMode: string;
</script>

<td>
	<InputValue bind:value {offset} {viewMode} />
</td>
