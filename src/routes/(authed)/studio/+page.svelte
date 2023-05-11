<script lang="ts">
	import { base } from "$app/paths";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h2>@{data.channel.name}</h2>

<div class="my-4">
  <ul>
    <li>
      <a href={`${base}/studio/challenges`} class="underline">Challenges</a>
    </li>
  </ul>
</div>