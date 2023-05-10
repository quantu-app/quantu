<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';
	import { superForm } from "sveltekit-superforms/client";

	export let data: PageData;

	const { form, errors, message, enhance } = superForm(data.form);
</script>

<div class="md:w-72 w-full mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">Sign In</h1>
	<p class="py-2">
		<span>Not a member?</span>	
		<a href={`${base}/auth/signup`} class="underline text-blue-500">Sign up</a>
	</p>
	<form
		method="POST"
		action="?/signin"
	>
		{#if $message}
  		<div class="text-sm text-red-600 mb-2">{$message}</div>
		{/if}
		<div class="mb-2">
			<input
				class="w-full border border-slate-800"
				type="text"
				name="email"
				class:border-red-600={$errors.email}
				class:placeholder-red-600={$errors.email}
				placeholder="Email"
				data-invalid={$errors.email}
				bind:value={$form.email}
			/>
			{#if $errors.email}<span class="text-sm text-red-600">{$errors.email}</span>{/if}
		</div>
		<div class="mb-2">
			<input
				class="w-full border border-slate-800"
				type="password" 
				name="password"
				class:border-red-600={$errors.password}
				class:placeholder-red-600={$errors.password}
				placeholder="Password"
				data-invalid={$errors.password}
				bind:value={$form.password}
			/>
			{#if $errors.password}<span class="text-sm text-red-600">{$errors.password}</span>{/if}
		</div>
		<button
			formaction="?/signin"
			class="btn btn-primary w-full">Sign in</button>
	</form>
</div>


