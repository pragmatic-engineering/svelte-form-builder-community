<script lang="ts">
	import type { Field, FormTab, ComponentOptions, FileUploadSerialization } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	let files: FileList;

	export async function customGetUserData() {
		let results: FileUploadSerialization[] = [];

		if (files) {
			for (let index = 0; index < files.length; index++) {
				const file = files[index];
				let base64 = await getBase64(file);
				results = [
					...results,
					{ name: file.name, size: file.size, type: file.type, base64: base64 }
				];
			}
		}

		return results;
	}

	async function getBase64(file: File) {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let encoded = reader.result && reader.result.toString().replace(/^data:(.*,)?/, '');
				if (encoded) {
					if (encoded.length % 4 > 0) {
						encoded += '='.repeat(4 - (encoded.length % 4));
					}
				}
				resolve(encoded as string);
			};
			reader.onerror = (error) => reject(error);
		});
	}
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<input
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		type="file"
		bind:files
		on:pointerleave
		on:pointerenter
		on:invalid
		on:change={async (e) => {
			$conditionManager.EvaluateFieldValue(e, field, await customGetUserData());
		}}
		on:change={componentOptions?.events?.onchange}
		on:input={componentOptions?.events?.oninput}
		on:blur={componentOptions?.events?.onblur}
		on:focus={componentOptions?.events?.onfocus}
		on:invalid={componentOptions?.events?.oninvalid}
	/>
</GroupSlot>
