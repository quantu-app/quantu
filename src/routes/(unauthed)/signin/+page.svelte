<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	import TextField from '$lib/components/theme/TextField.svelte';
	import SecureField from '$lib/components/theme/SecureField.svelte';
	import Link from '$lib/components/theme/Link.svelte';
	import Button from '$lib/components/theme/Button.svelte';
	import type { ActionData } from './$types';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<div class="md:w-72 w-full mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">{$_('users.signin.heading')}</h1>
	<p class="py-2">
		{$_("users.signin.signup_prompt") }
		<Link href={`${base}/signup`}>{$_("users.signin.signup_link")}</Link>
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
				placeholder={$_("users.form_fields.username")}
				errors={form?.global}
				showErrors={false}
				bind:value={username} />
		</div>
		<div class="mb-2">
			<SecureField 
				name="password"
				placeholder={$_("users.form_fields.password")}
				errors={form?.global}
				showErrors={false}
				bind:value={password}
			/>
		</div>
		<Button 
			formaction="?/signin"
			buttonStyle="borderedProminent"
			label={$_('users.signin.button') } />
	</form>
</div>
