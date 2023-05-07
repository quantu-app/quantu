<svelte:options immutable />

<script lang="ts" context="module">
	import '../../app.postcss';
	import Navbar from '$lib/components/app/Navbar.svelte';
	
</script>

<script lang="ts">
		import type { PageData } from './$types';

		export let data: PageData;
</script>

<div class="app--contents">
	<div class="app--navigation">
		<Navbar user={data.user}/>
	</div>
	<main class="app--main">
		<slot />
	</main>
</div>