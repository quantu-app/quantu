<svelte:options immutable />

<script lang="ts" context="module">
	import '../app.postcss';
	import '$lib/i18n'
	import Spinner from '$lib/components/Spinner.svelte'

	import { isLoading, locale } from 'svelte-i18n';

	locale.set("en");
</script>

{#if $isLoading}
	<Spinner />
{:else}
	<slot />
{/if}
