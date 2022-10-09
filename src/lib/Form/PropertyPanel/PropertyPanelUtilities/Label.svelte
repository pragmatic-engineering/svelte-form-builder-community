<script lang="ts">
  export let label: string;
  export let forName: string;
  export let cursor: string = "";
</script>

<label for="{forName}" style="cursor:{cursor}"
  >{label}
  <slot />
</label>

<style>
  label {
    font-weight: 500;
  }
</style>
