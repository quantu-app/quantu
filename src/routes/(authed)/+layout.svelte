<svelte:options immutable />

<script lang="ts" context="module">
	import Navbar from '$lib/components/app/Navbar.svelte';
</script>

<script lang="ts">
		import type { PageData } from './$types';

		export let data: PageData;
</script>

<div class="app--contents w-screen h-screen">
	<div class="app--navigation w-full">
		<Navbar user={data.user}/>
	</div>
	<main class="app--main">
		<slot />
	</main>
</div>