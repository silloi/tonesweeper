<script lang="ts">
	import InputValue from './InputValue.svelte';

	export let value: number | null;
</script>

<td>
	<InputValue bind:value />
</td>
