<script lang="ts">
	import { base } from "$app/paths";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h2>{data.channel.name}</h2>

<ul>
  <li>
    <a href={`${base}/studio/challenges`} class="link link-primary">Challenges</a>
  </li>
</ul>