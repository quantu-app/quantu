<script lang="ts">
  import type { PageData } from "./$types";
  import RichEditor from "$lib/components/editor/RichEditor.svelte";
	import { superForm } from "sveltekit-superforms/client";

  export let data: PageData;

	const { form, errors, message } = superForm(data.form, { dataType: 'json'});

  let rteDescription = "";

  $: $form.description = JSON.stringify(rteDescription)

</script>


<form method="POST" action="?/create">
  <div id="challenge--metainfo" class="mt-4 border-b pb-4 mb-4 border-slate-200">
    <h4 class="font-bold">Meta Info</h4>
    <div class="flex flex-row gap-4">
      <div class="form-field my-2 w-1/2">
        <div class="form-control">
          <input
              type="text"
              name="name"
              placeholder="Name"
              class="w-full border bg-white"
              class:border-slate-800={!$errors.name}
              class:border-red-600={$errors.name}
              class:placeholder-red-600={$errors.name}
              data-invalid={$errors.name}
              bind:value={$form.name}
          />
          {#if $errors.name}<span class="text-sm text-red-600">{$errors.name}</span>{/if}
        </div>
      </div>

      <div class="form-field my-2 w-1/2">
        <div class="form-control">
          <input
            type="text"
            name="url"
            class="w-full border bg-white"
            class:border-slate-800={!$errors.url}
            class:border-red-600={$errors.url}
            class:placeholder-red-600={$errors.url}
            placeholder="URL"
            data-invalid={$errors.url}
            bind:value={$form.url}
          />
          {#if $errors.url}<span class="text-red-600 text-sm">{$errors.url}</span>{/if}
        </div>
      </div>
    </div>

    <div class="form-field">
      <label for="description" class="form-label">Description</label>
      <RichEditor name="description" bind:value={rteDescription} hasError={!!$errors.description} />
      <input name="description" type="text" bind:value={$form.description} class="hidden" />
      {#if $errors.description}<span class="text-red-600 text-sm">{$errors.description}</span>{/if}
    </div>
  </div>

  <div class="my-4">
    <button class="btn btn-primary text-sm">Create</button>
  </div>
</form>