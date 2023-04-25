<script lang="ts">
  // see: https://kit.svelte.dev/docs/errors
  import { page } from "$app/stores";
</script>

{#if $page.error}
  <h1>{$page.status}: {$page.error.message}</h1>
{/if}