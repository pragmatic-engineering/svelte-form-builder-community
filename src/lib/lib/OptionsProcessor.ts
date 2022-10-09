import { componentsLoaded, importedComponents, mainDefinition, opts, view } from '$lib/Utils/store';
import { get } from 'svelte/store';
import { TabManager } from '$lib/Tabs/TabManager';
import merge from 'lodash.merge';

import { DefinitionManager } from '$lib/lib/DefinitionManager';
import {
	defaultHTMLAttributes,
	defaultDataAttributes,
	defaultDisableStandardHTMLValidityCheck,
	defaultHasChoices,
	defaultNoTooltipProperties,
	defaultDisabledHTMLAttributes
} from '$lib/lib/DefaultAttributeMap';

import type { BuilderOptions, ComponentOptions } from '$lib/Utils/types';
import { ThemeMap } from '$lib/Utils/Misc/Theme';
import type { FormComponentsType, FormDefinition, FormTab } from '$lib/Utils/types';

export class OptionsProcessor {
	usedComponents: FormComponentsType[] = [];
	constructor(public opts: BuilderOptions) {}

	static loadDefaults(options: BuilderOptions) {
		const defaults: Partial<BuilderOptions> = {
			activeTabOrderValue: 1,
			enableTabs: true,
			confirmRemoveField: true,
			confirmRemoveTab: true
		};

		//Set theme
		if (options.theme) {
			defaults.styling = ThemeMap[options.theme];
		}

		if (options.styling) {
			defaults.styling = options.styling;
		}

		if (!defaults.styling) {
			defaults.styling = ThemeMap['Default'];
		}

		if (!options.formDefinition) {
			options.formDefinition = [];
		}

		//options = Object.assign({}, defaults, options);
		options = merge({}, defaults, options);

		opts.set(options);

		//Change default view if passed in
		view.set(options.view ?? 'build');
	}

	async init() {
		if (get(componentsLoaded)) {
			console.log(`Don't reload me Svelte!`);
			return;
		}

		await this.InitialComponentLoad();
		await this.ProcessFormDefinition();

		componentsLoaded.set(true);
	}

	private async InitialComponentLoad() {
		for (const definition of this.opts.formDefinition) {
			for (const row of definition.rows) {
				for (const field of row.fields) {
					await this.ImportComponent(field.componentName);
				}
			}
		}
	}

	private IsComponentLoaded(componentName: string) {
		return get(importedComponents).some((x) => x.componentOptions.componentName == componentName);
	}

	public async ImportComponent(componentName: FormComponentsType) {
		if (this.IsComponentLoaded(componentName)) {
			return;
		}

		const componentOptions = this.LoadComponent(componentName);

		try {
			if (!componentOptions.importPath) {
				return;
			}

			const obj = await import(/* @vite-ignore */ componentOptions.importPath);

			this.MergeComponentAttributes(componentOptions);

			const componentImport = {
				component: obj.default,
				componentOptions: componentOptions
			};

			importedComponents.update((componentMap) => [...componentMap, componentImport]);

			if (this.opts.builderAPIEvents?.onComponentImported) {
				this.opts.builderAPIEvents?.onComponentImported.call(this, componentImport);
			}
		} catch (error) {
			console.error(error);
		}
	}

	//Merge any internal attributes into componentOptions
	private MergeComponentAttributes(componentOptions: ComponentOptions) {
		const internalHTMLAttributes = defaultHTMLAttributes[componentOptions.componentName];
		if (internalHTMLAttributes) {
			componentOptions.htmlAttributes = merge(
				{},
				internalHTMLAttributes,
				componentOptions.htmlAttributes
			);
			//componentOptions.htmlAttributes = Object.assign({}, obj.htmlAttributes, componentOptions.htmlAttributes);
		}

		const internalDataAttributes = defaultDataAttributes[componentOptions.componentName];
		if (internalDataAttributes) {
			if (!componentOptions.dataAttributes) {
				componentOptions.dataAttributes = [];
			}

			for (const attribute of internalDataAttributes) {
				//Overriding attributes that come from componentOptions matching on name
				const userOverrideAttribute = componentOptions.dataAttributes?.filter(
					(x) => x.name == attribute.name
				)[0];
				if (userOverrideAttribute) {
					// attribute = userOverrideAttribute;
					// componentOptions.dataAttributes = componentOptions.dataAttributes?.filter((x) => x != userOverrideAttribute);
				} else {
					//If not found, push to componentOptions
					componentOptions.dataAttributes?.push({ ...attribute });
				}
			}
		}

		//Map over some other special attributes
		componentOptions.disableStandardHTMLValidityCheck =
			componentOptions.disableStandardHTMLValidityCheck ??
			defaultDisableStandardHTMLValidityCheck[componentOptions.componentName];

		componentOptions.hasChoices =
			componentOptions.hasChoices ?? defaultHasChoices[componentOptions.componentName];

		componentOptions.noTooltipProperties =
			componentOptions.noTooltipProperties ??
			defaultNoTooltipProperties[componentOptions.componentName];

		//Combine disabled HTML Attributes
		if (componentOptions.disabledHtmlAttributes) {
			componentOptions.disabledHtmlAttributes = [
				...componentOptions.disabledHtmlAttributes,
				...defaultDisabledHTMLAttributes[componentOptions.componentName]
			];
		} else {
			componentOptions.disabledHtmlAttributes =
				defaultDisabledHTMLAttributes[componentOptions.componentName];
		}
	}

	private LoadComponent(componentName: FormComponentsType): ComponentOptions {
		let componentOption: ComponentOptions = {
			importPath: `../Components/${componentName}.svelte`,
			componentName: componentName
		};

		//Pass in user defined options (or load user defined component) if found by matching Component Name
		const userDefinedComponentOptions = this.opts.theComponentImports.find(
			(x) => x.componentName == componentName
		);

		if (userDefinedComponentOptions) {
			componentOption = { ...componentOption, ...userDefinedComponentOptions };
		}

		this.opts.theComponentImports.push(componentOption);

		return componentOption;
	}

	// Instantiate provided components to test they conform to a required interface
	// private IsComponentValid(obj: any, importPath: string, testElement: HTMLElement | null) {
	// 	let valid = true;
	// 	try {
	// 		let testInstance = new obj.default({ target: testElement });
	// 		if (!testInstance.hasOwnProperty('field')) {
	// 			console.error(
	// 				`Component ${importPath} is not valid. Add 'export let field: Field' as a prop`
	// 			);
	// 			valid = false;
	// 		}
	// 		testInstance = null;
	// 	} catch (error) {
	// 		console.error(error);
	// 		console.error(`Component ${importPath} could not be instantiated.`);
	// 		valid = false;
	// 	}

	// 	return valid;
	// }

	private async ProcessFormDefinition() {
		//Setup default tab if starting with empty definition
		if (!this.opts.formDefinition.length) {
			const definition: FormDefinition = { rows: [] };
			this.SetupDefaultTab(definition);
			this.opts.formDefinition.push(definition);
		}

		for (const definitions of this.opts.formDefinition) {
			if (!this.opts.enableTabs && !definitions.tab) {
				this.SetupDefaultTab(definitions);
			}

			TabManager.MergeTabAttributes(definitions.tab);

			definitions.rows.forEach((row) => {
				row.fields.forEach((field) => {
					DefinitionManager.processField(field);
				});
			});
		}

		mainDefinition.set(this.opts.formDefinition);
	}

	public async ReLoadDefinition(definition: FormDefinition[]) {
		get(opts).formDefinition = definition;
		await this.ProcessFormDefinition();
	}

	private SetupDefaultTab(definition: FormDefinition) {
		definition.tab = {} as FormTab;
		definition.tab.tabOrder = 1;
		definition.tab.label = 'Default';
		definition.tab.id = 'default';
	}
}
