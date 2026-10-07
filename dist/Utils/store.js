import { TabManager } from '$lib/Tabs/TabManager';
import { writable, derived } from 'svelte/store';
export const importedComponents = writable([]);
export const mainDefinition = writable({});
export const opts = writable({});
export const isDraggingStore = writable(false);
export const dropTargetRowIndexStore = writable(0);
export const isPointerOverFieldStore = writable(false);
export const focusedField = writable({});
export const propertyField = writable({});
export const showPropertyPanel = writable(false);
export const tabPropertiesOpen = writable(false);
export const componentSelectionStyle = writable({});
export const componentSelectionPoppedOut = writable(false);
export const isTabDragging = writable(false);
export const isComponentSelectionDragging = writable(false);
export const isComponentDragging = writable(false);
export const setComponentSelectionCategory = writable('');
export const view = writable('build');
export const rendering = derived(view, ($view) => $view == 'render' || $view == 'preview');
export const componentsLoaded = writable(false);
export const componentInstances = writable({});
export const optionsProcessorStore = writable({});
export const formMounted = writable(false);
export const allFields = writable([]);
export const numFormsMounted = writable(0);
export const allFormsMounted = derived(
	numFormsMounted,
	($numFormsMounted) => $numFormsMounted == TabManager.numTabs()
);
export const conditionManager = writable({});
export const reloadConditions = writable(false);
