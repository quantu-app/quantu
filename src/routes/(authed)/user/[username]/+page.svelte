<svelte:options immutable />

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.user.username} (You)</h1>
