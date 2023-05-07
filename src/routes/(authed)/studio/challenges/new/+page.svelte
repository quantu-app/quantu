<script lang="ts">
	import TextField from "$lib/components/theme/TextField.svelte";
  import type { ActionData } from "./$types";

  export let name: string;
  export let uri: string;

  export let form: ActionData;
</script>


<form method="POST" action="?/create">
  <div class="metainfo">
    <div class="form-input">
      <TextField
          name="name"
          placeholder="Name"
          errors={form?.name}
          showErrors={true}
          bind:value={name} />
    </div>

    <div class="form-input">
      <TextField
          name="uri"
          placeholder="URI"
          errors={form?.uri}
          showErrors={true}
          bind:value={uri} />
    </div>
  </div>

  <button class="btn btn-primary btn-sm">Create</button>
</form>