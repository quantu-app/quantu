<svelte:options immutable />

<script lang="ts">
	import { _ } from "svelte-i18n";
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import InputMessages from '$lib/components/InputMessages.svelte';
	import type { ActionData } from './$types';

	let username = '';
	let password = '';
	let passwordConfirmation = '';

	export let form: ActionData;
</script>

<div class="max-w-sm mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-2">{$_("users.signup.heading") }</h1>
	<p>
		{$_("users.signup.signin_prompt") }
		<a href={`${base}/signin`}>{$_("users.signup.signin")}</a></p>
	<form
		class="flex flex-col"
		method="POST"
		use:enhance={() =>
			async ({ update }) =>
				update({ reset: false })}
		action="?/signup"
	>
		<div class="mb-2">
			<input type="text" name="username" placeholder={$_("users.signup.form.username")} bind:value={username} />
			<InputMessages messages={form?.username} />
		</div>
		<div class="mb-2">
			<input type="password" name="password" placeholder={$_("users.signup.form.password")} bind:value={password} />
			<InputMessages messages={form?.password} />
		</div>
		<div class="mb-2">
			<input
				type="password"
				name="passwordConfirmation"
				placeholder={$_("users.signup.form.password_confirmation")}
				bind:value={passwordConfirmation}
			/>
			<InputMessages messages={form?.passwordConfirmation} />
		</div>
		<button class="btn primary mb-2" formaction="?/signup">{$_("users.signup.button")}</button>
	</form>
</div>
