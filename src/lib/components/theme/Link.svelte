<script lang="ts">
  export let href: string;
  let klass: string;
  export { klass as class };
</script>

<a {href} class="text-systemBlue-light {klass}"><slot /></a>