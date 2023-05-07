<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import type { ActionData } from './$types';
	import TextField from "$lib/components/theme/TextField.svelte";
	import SecureField from "$lib/components/theme/SecureField.svelte";
	import Button from "$lib/components/theme/Button.svelte";

	let username = '';
	let password = '';
	let passwordConfirmation = '';

	export let form: ActionData;
</script>

<div class="md:w-72 mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">Sign up	</h1>
	<p class="py-2">
		Already a member?
		<a href={`${base}/signin`} class="link link-primary">Sign in</a>
	</p>
	<form
		class="flex flex-col"
		method="POST"
		action="?/signup"
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
				errors={form?.username}
				bind:value={username} />
		</div>
		<div class="mb-2">
			<SecureField 
				name="password"
				placeholder="Password"
				errors={form?.password}
				bind:value={password}
			/>
		</div>
		<div class="mb-2">
			<SecureField 
				name="passwordConfirmation"
				placeholder="Password confirmation"
				errors={form?.passwordConfirmation}
				bind:value={passwordConfirmation}
			/>
		</div>
		<button 
			formaction="?/signup"
			class="btn btn-primary btn-sm">Sign up</button>
	</form>
</div>
