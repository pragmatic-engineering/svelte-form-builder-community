import type { FormTab } from '$lib/Utils/types';
export declare class DragNDropTabs {
	dragSource_Tab: FormTab | null;
	dragSource_Element: HTMLElement | null;
	constructor();
	tabDragStart(event: DragEvent, tab: FormTab | undefined): void;
	tabDragOver(event: DragEvent, tab: FormTab | undefined): void;
	tabDragEnd(event: DragEvent, tab: FormTab | undefined): void;
}
