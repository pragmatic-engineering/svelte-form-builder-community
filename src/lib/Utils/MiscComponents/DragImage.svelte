<script lang="ts">
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { CScope } from '$lib/Utils/Utils';
</script>

<!-- Needs to be setup for browser to prerender -->
<div id={CScope('dragimage')} style="position:relative;left:-100000px">
	<Icon type="AllWayMove" size="32" />
</div>

<div id={CScope('tabdragimage')} style="position:relative;left:-100000px">
	<Icon type="HorizontalMove" size="24" viewBox={'0 0 24 24'} />
</div>
