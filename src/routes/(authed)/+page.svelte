<svelte:options immutable />

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log(data)
</script>

<h1>Hello, {data.user.username}!</h1>
