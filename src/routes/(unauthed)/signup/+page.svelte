<svelte:options immutable />

<script lang="ts">
	import { _ } from "svelte-i18n";
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import InputMessages from '$lib/components/InputMessages.svelte';
	import type { ActionData } from './$types';
	import TextField from "$lib/components/theme/TextField.svelte";
	import SecureField from "$lib/components/theme/SecureField.svelte";
	import Button from "$lib/components/theme/Button.svelte";

	let username = '';
	let password = '';
	let passwordConfirmation = '';

	export let form: ActionData;

	$: console.log(form)
</script>

<div class="max-w-sm mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-2">{$_("users.signup.heading") }</h1>
	<p>
		{$_("users.signup.signin_prompt") }
		<a href={`${base}/signin`}>{$_("users.signup.signin")}</a></p>
	<form
		class="flex flex-col"
		method="POST"
		action="?/signup"
	>
		<div class="mb-2">
			<TextField
				name="username"
				placeholder={$_("users.signup.form.username")}
				errors={form?.username}
				bind:value={username} />
		</div>
		<div class="mb-2">
			<SecureField 
				name="password"
				placeholder={$_("users.signup.form.password")}
				errors={form?.password}
				bind:value={password}
			/>
		</div>
		<div class="mb-2">
			<SecureField 
				name="passwordConfirmation"
				placeholder={$_("users.signup.form.password_confirmation")}
				errors={form?.passwordConfirmation}
				bind:value={passwordConfirmation}
			/>
		</div>
		<Button label={$_("users.signup.button")} formaction="?/signup" />
	</form>
</div>
