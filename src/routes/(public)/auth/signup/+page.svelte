<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types';
	

	export let data: PageData;

	const { form, errors, message } = superForm(data.form);
</script>

<div class="w-96 mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">Sign up</h1>
	<p class="py-2">
		Already a member?
		<a href={`${base}/auth/signin`} class="underline text-blue-500">Sign in</a>
	</p>
	<form
		class="flex flex-col"
		method="POST"
		action="?/signup"
	>
		{#if $message}
			<div class="text-sm text-red-600 mb-2">{$message}</div>
		{/if}
		<div class="mb-2">
			<input type="text"
				class="w-full border"
				name="email"
				class:border-slate-800={!$errors.email}
				class:border-red-600={$errors.email}
				class:placeholder-red-600={$errors.email}
				data-invalid={$errors.email}
				placeholder="Email"
				bind:value={$form.email}
			/>
			{#if $errors.email}<span class="text-xs text-red-600">{$errors.email}</span>{/if}
		</div>
		<div class="mb-2">
			<input
				type="text"
				class="w-full border"
				class:border-red-600={$errors.username}
				class:placeholder-red-600={$errors.username}
				class:border-slate-800={!$errors.username}
				name="username"
				placeholder="Username"
				bind:value={$form.username}
			/>
			{#if $errors.username}<span class="text-xs text-red-600">{$errors.username}</span>{/if}
		</div>
		<div class="mb-2">
			<input
				class="w-full border"
				type="password" 
				name="password"
				class:border-red-600={$errors.password}
				class:placeholder-red-600={$errors.password}
				class:border-slate-800={!$errors.password}
				placeholder="Password"
				bind:value={$form.password}
			/>
			{#if $errors.password}<span class="text-xs text-red-600">{$errors.password}</span>{/if}
		</div>
		<div class="mb-2">
			<input
				class="w-full border"
				class:border-red-600={$errors.password_confirmation}
				class:placeholder-red-600={$errors.password_confirmation}
				class:border-slate-800={!$errors.password_confirmation}
				type="password" 
				name="password_confirmation"
				placeholder="Password confirmation"
				bind:value={$form.password_confirmation}
			/>
			{#if $errors.password_confirmation}<span class="text-xs text-red-600">{$errors.password_confirmation}</span>{/if}
		</div>
		<button 
			formaction="?/signup"
			class="btn btn-primary btn-sm">Sign up</button>
	</form>
</div>
