<script lang="ts">
	import TextField from "$lib/components/theme/TextField.svelte";
  import type { ActionData } from "./$types";
  import RichEditor from "$lib/components/editor/RichEditor.svelte";

  export let name: string;
  export let url: string;
  export let description: any;
  export let prompt: any;

  export let form: ActionData;

  $: descriptionEncoded = JSON.stringify(description)
  $: promptEncoded = JSON.stringify(prompt)
</script>


<form method="POST" action="?/create">
  <div class="metainfo">
    <div class="form-field">
      <div class="form-control">
      <TextField
          name="name"
          placeholder="Name"
          errors={form?.name}
          showErrors={true}
          bind:value={name} />
      </div>
    </div>

    <div class="form-field">
      <div class="form-control">
      <TextField
          name="url"
          placeholder="URL"
          errors={form?.url}
          showErrors={true}
          bind:value={url} />
      </div>
    </div>

    <div class="form-field">
      <label for="description" class="form-label">Description</label>
      <RichEditor name="description" bind:value={description} />
      <input name="description" type="text" bind:value={descriptionEncoded} class="hidden" />
    </div>
  </div>

  <div class="challengeInfo">
    <div class="form-field">
      <label for="prompt" class="form-label">Prompt</label>
      <RichEditor name="prompt" bind:value={prompt} />
      <input name="prompt" type="text" bind:value={promptEncoded} class="hidden" />
    </div>
  </div>

  <button class="btn btn-primary btn-sm">Create</button>
</form>