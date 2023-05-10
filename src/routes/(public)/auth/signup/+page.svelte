<svelte:options immutable />

<script lang="ts">
	import { base } from '$app/paths';
	import { createForm } from "felte";
	import { validator } from '@felte/validator-zod';
	import * as zod from 'zod';

	const schema = zod.object({
		email: zod.string().email().nonempty(),
		username: zod.string().min(3).nonempty(),
		password: zod.string().nonempty(),
		passwordConfirmation: zod.string().nonempty(),
	});



	const { form } = createForm({
		extend: validator({schema})
	})
</script>

<div class="md:w-72 mx-auto my-auto bg-white dark:bg-gray-950 shadow p-4">
	<h1 class="mb-1">Sign up</h1>
	<p class="py-2">
		Already a member?
		<a href={`${base}/auth/signin`} class="link link-primary">Sign in</a>
	</p>
	<form
		use:form
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
			<input type="text"
				name="email"
				placeholder="Email" />
		</div>
		<div class="mb-2">
			<input type="text"
				name="username"
				placeholder="Username" />
		</div>
		<div class="mb-2">
			<input
				type="password" 
				name="password"
				placeholder="Password" />
		</div>
		<div class="mb-2">
			<input
				type="password" 
				name="passwordConfirmation"
				placeholder="Password confirmation"
			/>
		</div>
		<button 
			formaction="?/signup"
			class="btn btn-primary btn-sm">Sign up</button>
	</form>
</div>
