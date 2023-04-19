<svelte:options immutable />

<script lang="ts">
	import type { NotificationType } from '$lib/state/notifications';
	import MdError from 'svelte-icons/md/MdError.svelte';
	import MdCheckCircle from 'svelte-icons/md/MdCheckCircle.svelte';
	import MdInfo from 'svelte-icons/md/MdInfo.svelte';
	import MdWarning from 'svelte-icons/md/MdWarning.svelte';
	import { noop } from 'svelte/internal';

	export let type: NotificationType;
	export let message: string;
	export let onDelete: () => void = noop;
</script>

<button
	class="flex flex-grow items-center py-2 px-3 my-1 cursor-pointer shadow"
	class:bg-green-500={type === 'success'}
	class:bg-red-500={type === 'error'}
	class:bg-blue-500={type === 'info'}
	class:bg-yellow-500={type === 'warning'}
	on:click={onDelete}
>
	<div class="w-6 h-6 mr-2 text-white">
		{#if type === 'error'}
			<MdError />
		{:else if type === 'success'}
			<MdCheckCircle />
		{:else if type === 'info'}
			<MdInfo />
		{:else if type === 'warning'}
			<MdWarning />
		{/if}
	</div>
	<div class="text-white max-w-xs">{message}</div>
</button>
