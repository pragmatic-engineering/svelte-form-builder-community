import { get } from 'svelte/store';
import { mainDefinition, opts } from '$lib/Utils/store';
import type { FormDefinition, FormTab, BuilderOptions } from '$lib/Utils/types';

export class TabManager {
	constructor(public opts: BuilderOptions) {}

	static getActiveTabDefinition() {
		return get(mainDefinition).find(
			(x) => x.tab?.tabOrder == get(opts).activeTabOrderValue
		) as FormDefinition;
	}

	static addTab() {
		const options = get(opts);

		const len = get(mainDefinition).length + 1;

		const tab: FormTab = { label: len.toString(), id: len.toString(), tabOrder: len };
		this.MergeTabAttributes(tab);

		const definitions = get(mainDefinition);
		definitions.push({
			tab: tab,
			rows: []
		});

		mainDefinition.set(definitions);

		options.activeTabOrderValue = len;
		opts.set(options);

		if (get(opts).builderAPIEvents?.onTabAdded) {
			get(opts).builderAPIEvents?.onTabAdded?.call(this, tab);
		}
	}

	//Merge any attributes defined in tabDataAttributes into the tab
	static MergeTabAttributes(tab: FormTab | undefined) {
		const options = get(opts);

		if (options.tabDataAttributes && tab) {
			if (!Array.isArray(tab.dataAttributes)) {
				tab.dataAttributes = [];
			}

			options.tabDataAttributes.forEach((attribute) => {
				//Overriding attributes that come from options matching on name
				const userOverrideAttribute = tab.dataAttributes?.filter(
					(x) => x.name == attribute.name
				)[0];
				if (userOverrideAttribute) {
				} else {
					//If not found, push to tab
					tab.dataAttributes?.push({ ...attribute });
				}
			});
		}
	}

	static deleteTab(tab: FormTab, confirmDelete = false) {
		if (confirmDelete) {
			if (confirm('Are you sure you want to delete this tab?')) {
			} else {
				return;
			}
		}

		const definitions = get(mainDefinition);
		const filtered = definitions.filter((x) => x.tab != tab);
		mainDefinition.update(() => filtered);

		//Focus on the first tab
		if (filtered.length) {
			const options = get(opts);
			options.activeTabOrderValue = filtered[0].tab?.tabOrder;
			opts.update(() => options);
		}

		if (get(opts).builderAPIEvents?.onTabDeleted) {
			get(opts).builderAPIEvents?.onTabDeleted?.call(this, tab);
		}
	}
}
