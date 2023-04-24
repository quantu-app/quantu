<script lang="ts" context="module">
	export type ButtonStyle = "borderless" | "bordered" | "borderedProminent";
  export type ControlSize = "mini" | "small" | "regular" | "large";
</script>

<script lang="ts">
  export let label: string;
  export let formaction: string = '';
  export let buttonStyle: ButtonStyle = "borderedProminent"
  export let controlSize: ControlSize  = "regular";

  const sizingClasses = (controlSize: ControlSize) => {
    switch(controlSize) {
      case "mini":
        return "text-xs p-0 rounded"
      case "small":
        return "text-sm p-1 rounded-md"
      case "regular":
        return "text-base px-3 py-1 rounded-md"
      case "large":
        return "text-lg px-4 py-2 rounded-lg"
    }
  }

  const buttonStyleClasses = (buttonStyle: ButtonStyle) => {
    switch(buttonStyle) {
      case "borderless":
        return "text-systemBlue-light hover:opacity-80"
      case "bordered":
        return "text-systemBlue-light bg-systemGray5-light hover:opacity-90 active:text-systemBlue2-light"
      case "borderedProminent":
        return "text-white bg-systemBlue-light hover:opacity-90 active:bg-systemBlue2-light"
    }
  }

  $: sizeClasses = sizingClasses(controlSize);
  $: btnClasses = buttonStyleClasses(buttonStyle);
</script>

{#if formaction.length > 0}
<button
  formaction={formaction}
  type="submit"
  class="focus:outline-none {sizeClasses} {btnClasses}"
  >{label}</button>
{:else}
<button
  type="button"
  class="focus:outline-none {sizeClasses} {btnClasses}"
  on:click
  >{label}</button>
{/if}
