<svelte:options immutable />

<script lang="ts">
	const gravatarBaseUrl = 'https://www.gravatar.com/avatar/';

	export let hash: string;
	export let rating: string = 'pg';
	export let fallbackImage: string = 'mp';
	export let size: number = 80;
	export let alt: string = "User's gravatar";

</script>

<img
	class="rounded-full h-full w-full"
	src={`${gravatarBaseUrl}${hash}?s=${size}&r=${rating}&d=${fallbackImage}`}
	{alt}
/>