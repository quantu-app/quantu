<script lang="ts">
	import type { ErrorMessage } from "$lib/types";

  export let value: string;
  export let name: string;
  export let placeholder: string = '';
  export let errors: ErrorMessage[] = [];
  export let showErrors = true;

  $: hasErrors = errors && errors.length > 0
</script>

<input
  type="password"
  name={name}
  placeholder={placeholder.length > 0 ?  placeholder : ''}
  bind:value={value}

  class:input-error={hasErrors}
  class="input input-md input-primary"/>
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
  .input-error::placeholder {
    color: rgb(255,59,48);
    opacity: 0.5;
  }
</style>