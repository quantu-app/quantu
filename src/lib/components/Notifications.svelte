<svelte:options immutable />

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { notifications, type INotification, removeNotification } from '$lib/state/notifications';
	import Notification from './Notification.svelte';

	function createOnDelete(notification: INotification) {
		return () => {
			removeNotification(notification.id);
		};
	}
</script>

<div class="fixed top-0 left-0 z-20 w-full">
	<div class="container mx-auto">
		{#each $notifications as notification (notification.id)}
			<div
				class="flex flex-col"
				animate:flip
				in:fly={{ y: -64, duration: 300 }}
				out:fly={{ y: -64, duration: 300 }}
			>
				<Notification
					type={notification.type}
					message={notification.message}
					onDelete={createOnDelete(notification)}
				/>
			</div>
		{/each}
	</div>
</div>
