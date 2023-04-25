<svelte:options immutable />
<script lang="ts" context="module">
	import '../../app.postcss';
	import '$lib/i18n'
	import Spinner from '$lib/components/Spinner.svelte'

	import { isLoading } from 'svelte-i18n';
	import Navbar from '$lib/components/app/Navbar.svelte';

</script>

{#if $isLoading}
	<Spinner />
{:else}
  <Navbar />
	<slot />
{/if}
