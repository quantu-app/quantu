<script lang="ts">
  export let label: string;
  export let buttonStyle: "borderless" | "bordered" | "borderedProminent" = "borderedProminent"
  export let controlSize: "mini" | "small" | "regular" | "large" = "regular";

  const sizingClasses = (controlSize) => {
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

  const buttonStyleClasses = (buttonStyle) => {
    switch(buttonStyle) {
      case "borderless":
        return "text-systemBlue-light"
      case "bordered":
        return "text-systemBlue-light bg-systemGray5-light"
      case "borderedProminent":
        return "text-white bg-systemBlue-light"
    }
  }

  $: sizeClasses = sizingClasses(controlSize);
  $: btnClasses = buttonStyleClasses(buttonStyle);
</script>

<button
  type="button"
  class="{sizeClasses} {btnClasses}"
  on:click
  >{label}</button>
