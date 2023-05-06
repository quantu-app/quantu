<script lang="ts">
	import type { ActionData } from "./$types";


  export let form: ActionData;
</script>


<form method="POST" action="?/create">
  <div class="form-input">
    <label for="name">Name</label>
    <input type="text" name="name" />
  </div>

  <div class="form-input">
    <label for="uri">URI</label>
    <input type="text" name="uri" />
  </div>

  <button>Create</button>
</form>