<script lang="ts">
  export let showIf: boolean;
</script>

<span class="wrapper" style:display="{showIf ? "" : "none"}">
  <slot />
</span>

<style>
  .wrapper {
    display: contents;
  }
</style>
