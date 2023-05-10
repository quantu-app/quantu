<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import TextField from '$lib/components/theme/TextField.svelte';
	import SecureField from '$lib/components/theme/SecureField.svelte';
	import type { ActionData } from './$types';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<div class="md:w-72 w-full mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">Sign In</h1>
	<p class="py-2">
		<span>Not a member?</span>	
		<a href={`${base}/auth/signup`} class="link link-primary">sign up</a>
	</p>
	<form
		class="flex flex-col"
		method="POST"
		use:enhance={() =>
			async ({ update }) =>
				update({ reset: false })}
		action="?/signin"
	>
		{#if form?.global}
			<div class="mb-2">
			{#each form.global as err}
				<span class="w-full text-systemRed-light">{err.message}</span>
			{/each}
			</div>
		{/if}
		<div class="mb-2">
			<TextField
				name="username"
				placeholder="Username"
				errors={form?.global}
				showErrors={false}
				bind:value={username} />
		</div>
		<div class="mb-2">
			<SecureField 
				name="password"
				placeholder="Password"
				errors={form?.global}
				showErrors={false}
				bind:value={password}
			/>
		</div>
		<button
			formaction="?/signin"
			class="btn btn-primary">Sign in</button>
	</form>
</div>
