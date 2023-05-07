<script lang="ts">
  import { base } from "$app/paths";
	import type { PageData } from "./$types";

  export let data: PageData;
  
  $: console.log(data);
</script>

<div class="container mx-auto my-4">
  <a class="btn btn-primary" href={`${base}/studio/challenges/new`}>create challenge</a>
  
  <div class="list">
  {#each data.challenges as challenge, key}
    <p data-key={key}>{challenge.name}</p>
  {/each}
  </div>

</div>