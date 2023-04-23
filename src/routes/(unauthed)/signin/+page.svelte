<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import InputMessages from '$lib/components/InputMessages.svelte';
	import TextField from '$lib/components/theme/TextField.svelte';
	import type { ActionData } from './$types';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<div class="max-w-sm mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-2">Sign in</h1>
	<p>Not a member? <a href={`${base}/signup`}>Sign up</a></p>
	<form
		class="flex flex-col"
		method="POST"
		use:enhance={() =>
			async ({ update }) =>
				update({ reset: false })}
		action="?/signin"
	>
		<div class="mb-2">
			<input type="text" name="username" placeholder="Username" bind:value={username} />
			<InputMessages messages={form?.username} />
		</div>
		<div class="mb-2">
			<input type="password" name="password" placeholder="Password" bind:value={password} />
		</div>
		<button class="btn primary mb-2" formaction="?/signin">Sign in</button>
	</form>
</div>
