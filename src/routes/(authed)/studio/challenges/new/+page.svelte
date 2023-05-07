<script lang="ts">
	import TextField from "$lib/components/theme/TextField.svelte";
  import type { ActionData } from "./$types";
  import RichEditor from "$lib/components/editor/RichEditor.svelte";

  export let name: string;
  export let uri: string;
  export let description: any;

  export let form: ActionData;

  $: descriptionEncoded = JSON.stringify(description)
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

    <div class="form-input">
      <RichEditor name="description" bind:value={description} />
      <input name="description" type="text" bind:value={descriptionEncoded} class="hidden" />
    </div>
  </div>

  <button class="btn btn-primary btn-sm">Create</button>
</form>