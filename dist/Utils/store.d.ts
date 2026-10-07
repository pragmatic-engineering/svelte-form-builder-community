import type { ConditionManager } from '$lib/lib/ConditionManager';
import type { OptionsProcessor } from '$lib/lib/OptionsProcessor';
import type {
	ComponentImport,
	BuilderOptions,
	SvelteFBComponent,
	FormDefinition,
	Field
} from '$lib/Utils/types';
export declare const importedComponents: import('svelte/store').Writable<ComponentImport[]>;
export declare const mainDefinition: import('svelte/store').Writable<FormDefinition[]>;
export declare const opts: import('svelte/store').Writable<BuilderOptions>;
export declare const isDraggingStore: import('svelte/store').Writable<boolean>;
export declare const dropTargetRowIndexStore: import('svelte/store').Writable<number>;
export declare const isPointerOverFieldStore: import('svelte/store').Writable<boolean>;
export declare const focusedField: import('svelte/store').Writable<Field>;
export declare const propertyField: import('svelte/store').Writable<Field>;
export declare const showPropertyPanel: import('svelte/store').Writable<boolean>;
export declare const tabPropertiesOpen: import('svelte/store').Writable<boolean>;
export declare const componentSelectionStyle: import('svelte/store').Writable<CSSStyleDeclaration>;
export declare const componentSelectionPoppedOut: import('svelte/store').Writable<boolean>;
export declare const isTabDragging: import('svelte/store').Writable<boolean>;
export declare const isComponentSelectionDragging: import('svelte/store').Writable<boolean>;
export declare const isComponentDragging: import('svelte/store').Writable<boolean>;
export declare const setComponentSelectionCategory: import('svelte/store').Writable<string>;
export declare const view: import('svelte/store').Writable<
	'build' | 'settings' | 'render' | 'preview' | 'conditions'
>;
export declare const rendering: import('svelte/store').Readable<boolean>;
export declare const componentsLoaded: import('svelte/store').Writable<boolean>;
export declare const componentInstances: import('svelte/store').Writable<
	Record<string, SvelteFBComponent>
>;
export declare const optionsProcessorStore: import('svelte/store').Writable<OptionsProcessor>;
export declare const formMounted: import('svelte/store').Writable<boolean>;
export declare const allFields: import('svelte/store').Writable<Field[]>;
export declare const numFormsMounted: import('svelte/store').Writable<number>;
export declare const allFormsMounted: import('svelte/store').Readable<boolean>;
export declare const conditionManager: import('svelte/store').Writable<ConditionManager>;
export declare const reloadConditions: import('svelte/store').Writable<boolean>;
