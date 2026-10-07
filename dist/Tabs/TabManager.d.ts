import type { FormDefinition, FormTab, BuilderOptions } from '$lib/Utils/types';
export declare class TabManager {
	opts: BuilderOptions;
	constructor(opts: BuilderOptions);
	static getActiveTabDefinition(): FormDefinition;
	static numTabs(): number;
	static addTab(): void;
	static MergeTabAttributes(tab: FormTab | undefined): void;
	static deleteTab(tab: FormTab, confirmDelete?: boolean): void;
	static getTabElement(label: string): HTMLElement | null;
	static activateTab(tabOrder: number | undefined): void;
}
