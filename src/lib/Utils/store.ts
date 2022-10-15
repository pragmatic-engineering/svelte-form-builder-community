import type { OptionsProcessor } from '$lib/lib/OptionsProcessor';
import type {
	ComponentImport,
	BuilderOptions,
	SvelteFBComponent,
	FormDefinition,
	Field,
	views
} from '$lib/Utils/types';
import { writable, derived } from 'svelte/store';

export const importedComponents = writable([] as ComponentImport[]);

export const mainDefinition = writable({} as FormDefinition[]);

export const opts = writable({} as BuilderOptions);

export const isDraggingStore = writable(false);
export const dropTargetRowIndexStore = writable(0);
export const isPointerOverFieldStore = writable(false);
export const focusedField = writable({} as Field);
export const propertyField = writable({} as Field);
export const showPropertyPanel = writable(false);
export const tabPropertiesOpen = writable(false);

export const componentSelectionStyle = writable({} as CSSStyleDeclaration);
export const componentSelectionPoppedOut = writable(false);

export const isTabDragging = writable(false);

export const isComponentSelectionDragging = writable(false);
export const isComponentDragging = writable(false);

export const view = writable('build' as views);

export const rendering = derived(view, ($view) => $view == 'render' || $view == 'preview');

export const componentsLoaded = writable(false);

export const componentInstances = writable({} as Record<string, SvelteFBComponent>);

export const optionsProcessorStore = writable({} as OptionsProcessor);

export const formMounted = writable(false);
