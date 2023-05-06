<script lang="ts">
  import { base } from "$app/paths";
	import type { PageData } from "./$types";

  export let data: PageData;

  
</script>

<div class="container mx-auto my-4">
  <a class="btn primary" href={`${base}/studio/channels/new`}>create channel</a>
  
  <div class="list">
    {#each data.channels as channel}
      {channel.name}
    {/each}
  </div>

</div>