import type { BuilderOptions } from '$lib/Utils/types';
import type { FormComponentsType } from '$lib/Utils/types';
export declare class OptionsProcessor {
	opts: BuilderOptions;
	usedComponents: FormComponentsType[];
	constructor(opts: BuilderOptions);
	static loadDefaults(options: BuilderOptions): void;
	init(): Promise<void>;
	private InitialComponentLoad;
	private IsComponentLoaded;
	ImportComponent(componentName: FormComponentsType): Promise<void>;
	private MergeComponentAttributes;
	private LoadComponent;
	private ProcessFormDefinition;
	ReLoadDefinition(definition: BuilderOptions): Promise<void>;
	private SetupDefaultTab;
}
