<script lang="ts">
  export let value: string;
  export let placeholder: string = '';
  export let errors: { type: string, value: string}[] = [];

  let baseClasses = "p-2 block border rounded-lg bg-white"
  let errorClasses = "text-systemRed-light border-systemRed-light"
  let okClasses = "text-systemBlue-light border-systemBlue-light"

  $: hasErrors = errors.length > 0
  $: styleClasses = hasErrors ?  errorClasses : okClasses
</script>

<input 
  type="text"
  placeholder={placeholder.length > 0 ?  placeholder : ''}
  bind:value={value}
  class="{baseClasses} {styleClasses}"/>
{#if hasErrors}
  {#each errors as err}
    <span class="text-xs text-systemRed-light">{err.value}</span>
  {/each}
{/if}

<style>
  ::placeholder {
    color: rgb(0,122,255);
    opacity: 0.5;
  }
</style>