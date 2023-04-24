<script lang="ts">
	import type { ErrorMessage } from "$lib/types";

  export let value: string;
  export let name: string;
  export let placeholder: string = '';
  export let errors: ErrorMessage[] = [];
  export let showErrors = true;

  let baseClasses = "w-full block border rounded-lg bg-white"
  let errorClasses = "text-systemRed-light border-systemRed-light"
  let okClasses = "text-systemBlue-light border-systemBlue-light"

  $: hasErrors = errors && errors.length > 0
  $: styleClasses = hasErrors ?  errorClasses : okClasses
</script>

<input
  type="password"
  name={name}
  placeholder={placeholder.length > 0 ?  placeholder : ''}
  bind:value={value}

  class:error={hasErrors}
  class="{baseClasses} {styleClasses}"/>
{#if hasErrors && showErrors}
  {#each errors as err}
    <span class="text-xs text-systemRed-light">{err.message}</span>
  {/each}
{/if}

<style>
  ::placeholder {
    color: rgb(0,122,255);
    opacity: 0.5;
  }
  .error::placeholder {
    color: rgb(255,59,48);
    opacity: 0.5;
  }
</style>