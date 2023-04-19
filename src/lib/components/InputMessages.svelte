<svelte:options immutable />

<script lang="ts" context="module">
	import type { NotificationType } from '$lib/state/notifications';
	import Notification from './Notification.svelte';

	export type IInputMessage = {
		type: NotificationType;
		value: string;
	};
</script>

<script lang="ts">
	export let messages: IInputMessage[] = [];

	function createOnDelete(message: IInputMessage) {
		return () => {
			const index = messages.indexOf(message);
			if (index !== -1) {
				const newMessages = messages.slice();
				newMessages.splice(index, 1);
				messages = newMessages;
			}
		};
	}
</script>

<div class="flex flex-grow w-full">
	{#each messages as message}
		<Notification type={message.type} message={message.value} onDelete={createOnDelete(message)} />
	{/each}
</div>
