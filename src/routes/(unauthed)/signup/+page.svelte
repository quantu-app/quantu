<svelte:options immutable />

<script lang="ts">
	import { _ } from "svelte-i18n";
	import { base } from '$app/paths';
	import type { ActionData } from './$types';
	import TextField from "$lib/components/theme/TextField.svelte";
	import SecureField from "$lib/components/theme/SecureField.svelte";
	import Button from "$lib/components/theme/Button.svelte";
	import Link from "$lib/components/theme/Link.svelte";

	let username = '';
	let password = '';
	let passwordConfirmation = '';

	export let form: ActionData;
</script>

<div class="md:w-72 mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">{$_("users.signup.heading") }</h1>
	<p class="py-2">
		{$_("users.signup.signin_prompt") }
		<Link href={`${base}/signin`}>{$_("users.signup.signin_link")}</Link>
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
				placeholder={$_("users.form_fields.username")}
				errors={form?.username}
				bind:value={username} />
		</div>
		<div class="mb-2">
			<SecureField 
				name="password"
				placeholder={$_("users.form_fields.password")}
				errors={form?.password}
				bind:value={password}
			/>
		</div>
		<div class="mb-2">
			<SecureField 
				name="passwordConfirmation"
				placeholder={$_("users.form_fields.password_confirmation")}
				errors={form?.passwordConfirmation}
				bind:value={passwordConfirmation}
			/>
		</div>
		<Button 
			formaction="?/signup"
			buttonStyle="borderedProminent"
			label={$_("users.signup.button")} />
	</form>
</div>
