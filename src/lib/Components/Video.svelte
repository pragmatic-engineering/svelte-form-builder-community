<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		controls
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		on:pointerleave
		on:pointerenter
		on:abort={componentOptions?.events?.onabort}
		on:canplay={componentOptions?.events?.oncanplay}
		on:canplaythrough={componentOptions?.events?.oncanplaythrough}
		on:cuechange={componentOptions?.events?.oncuechange}
		on:durationchange={componentOptions?.events?.ondurationchange}
		on:emptied={componentOptions?.events?.onemptied}
		on:encrypted={componentOptions?.events?.onencrypted}
		on:ended={componentOptions?.events?.onended}
		on:loadeddata={componentOptions?.events?.onloadeddata}
		on:loadedmetadata={componentOptions?.events?.onloadedmetadata}
		on:loadstart={componentOptions?.events?.onloadstart}
		on:pause={componentOptions?.events?.onpause}
		on:play={componentOptions?.events?.onplay}
		on:playing={componentOptions?.events?.onplaying}
		on:progress={componentOptions?.events?.onprogress}
		on:ratechange={componentOptions?.events?.onratechange}
		on:seeked={componentOptions?.events?.onseeked}
		on:seeking={componentOptions?.events?.onseeking}
		on:stalled={componentOptions?.events?.onstalled}
		on:suspend={componentOptions?.events?.onsuspend}
		on:timeupdate={componentOptions?.events?.ontimeupdate}
		on:volumechange={componentOptions?.events?.onvolumechange}
		on:waiting={componentOptions?.events?.onwaiting}
	/>
</GroupSlot>
