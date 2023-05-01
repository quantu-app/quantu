<script lang="ts">
	import type { IChannel } from "$lib/contexts/channels/types";


  let name: string;
  let uri: string;
  
  const createChannel = (event: Event) => {
    if (!name || !uri) {
      return
    }

    const body = { name, uri };

    fetch("/api/channels", { method: "POST", body: JSON.stringify(body), headers: {
      'Content-Type' : 'application/json'
    } })
      .then((res) => res.json())
      .then((newChannel: IChannel) => {
        console.log(newChannel);
      });

  }
</script>

<h2>Create a new channel</h2>
<form method="POST" action="?/create">
  <input type="text" name="name" bind:value={name}
    class="p-2 border w-full bg-white border-slate-900"/>
  
  <input type="text" name="uri" bind:value={uri}
    class="p-2 border w-full bg-white border-slate-900"
  />

  <button type="submit" on:click|preventDefault={createChannel}>Create</button>
</form>