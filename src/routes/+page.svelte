<script lang="ts">
	import FormBuilder from '$lib/FormBuilder.svelte';
	import { DefinitionManager } from '$lib/lib/DefinitionManager';

	import type {
		BuilderOptions,
		ComponentOptions,
		onAddChoiceParams,
		FieldInfo,
		ValidationResult,
		views,
		ChoiceElement,
		Field,
		FormDefinition,
		FormTab
	} from '$lib/Utils/types';
	import { capitalizeFirstLetter } from '$lib/Utils/Utils';

	let formJSON2: FormDefinition[] = [
		{
			tab: { id: 'one', tabOrder: 1, label: 'One' },
			rows: [
				{
					rowID: 1,
					fields: [
						{
							componentName: 'Text',
							htmlAttributes: {}
							// dataAttributes: [
							// 	{
							// 		label: 'Theme',
							// 		tab: 'Table',
							// 		name: 'theme',
							// 		value: 'tabulator_midnight.min.css',
							// 		options: [
							// 			{
							// 				label: 'Default',
							// 				value: 'tabulator.min.css'
							// 			},
							// 			{
							// 				label: 'Simple',
							// 				value: 'tabulator_simple.min.css'
							// 			},
							// 			{
							// 				label: 'Midnight',
							// 				value: 'tabulator_midnight.min.css'
							// 			},
							// 			{
							// 				label: 'Tabulator',
							// 				value: 'tabulator_site.min.css'
							// 			},
							// 			{
							// 				label: 'Bootstrap 3',
							// 				value: 'tabulator_bootstrap3.min.css'
							// 			},
							// 			{
							// 				label: 'Bootstrap 4',
							// 				value: 'tabulator_bootstrap4.min.css'
							// 			},
							// 			{
							// 				label: 'Bootstrap 5',
							// 				value: 'tabulator_bootstrap5.min.css'
							// 			},
							// 			{
							// 				label: 'Bulma',
							// 				value: 'tabulator_bulma.min.css'
							// 			},
							// 			{
							// 				label: 'Materialize',
							// 				value: 'tabulator_materialize.min.css'
							// 			}
							// 		]
							// 	}
							// ]
						}
					]
				}
				// {
				// 	rowID: 1.1,
				// 	fields: [
				// 		{
				// 			componentName: 'Text',
				// 			labelAttributes: { label: 'Label 1' },
				// 			htmlAttributes: { id: 'a' },
				// 			dataAttributes: [
				// 				{ label: 'Custom 1', name: 'custom1', value: 'hi' },
				// 				{ label: 'Custom 2', name: 'custom2', value: false },
				// 				{ label: 'Custom 3', name: 'custom3', value: false },
				// 				{ label: 'Custom 4', name: 'custom4', value: [1, 2, 3] },
				// 				{ label: 'Custom 5', name: 'custom5', value: { a: '1', b: '2', c: ['a'] } },
				// 				{ name: 'HiddenWithoutLabel', value: false },
				// 				{
				// 					label: 'Custom Options',
				// 					name: 'custom7',
				// 					options: [
				// 						{ label: 'Red', value: 'option-red' },
				// 						{ label: 'Green', value: 'option-green' },
				// 						{ label: 'Blue', value: 'option-blue' }
				// 					],
				// 					multiple: true
				// 				}
				// 			]
				// 		},
				// 		{
				// 			componentName: 'Select',
				// 			htmlAttributes: { id: 'select-1', required: true },
				// 			labelAttributes: { label: 'Favorite Frontend Frameworks?' },
				// 			choiceConfiguration: {
				// 				initialBlankChoice: true,
				// 				choices: [
				// 					{ value: 'Dog', label: 'Dog' },
				// 					{ value: 'Hamster', label: 'Hamster' }
				// 				]
				// 			}
				// 		},
				// 		{ componentName: 'Number', htmlAttributes: { max: 3, min: 2 } }
				// 	]
				// },
				// {
				// 	rowID: 2,
				// 	fields: [
				// 		{
				// 			componentName: 'Text',
				// 			labelAttributes: { label: 'First Name' },
				// 			htmlAttributes: { value: 'Josh', placeholder: 'The Placeholder' }
				// 		}
				// 	]
				// },
				// {
				// 	rowID: 3,
				// 	fields: [{ componentName: 'Text', htmlAttributes: { disabled: true } }]
				// },
				// {
				// 	rowID: 4,
				// 	fields: [
				// 		{
				// 			componentName: 'Checkbox Group',
				// 			htmlAttributes: { required: true },
				// 			choiceConfiguration: {
				// 				enableOther: true,
				// 				choices: [
				// 					{ label: 'Choice-1', value: 'choice-1' },
				// 					{ label: 'Choice-2', value: 'choice-2' }
				// 				]
				// 			}
				// 		}
				// 	]
				// },
				// {
				// 	rowID: 5,
				// 	fields: [
				// 		{
				// 			componentName: 'Radio Group',
				// 			htmlAttributes: { required: true },
				// 			choiceConfiguration: {
				// 				inline: true,
				// 				enableOther: true,
				// 				choices: [
				// 					{ label: 'Choice-1', value: 'choice-1' },
				// 					{ label: 'Choice-2', value: 'choice-2' }
				// 				]
				// 			}
				// 		}
				// 	]
				// },
				// {
				// 	rowID: 6,
				// 	fields: [
				// 		{
				// 			componentName: 'Audio',
				// 			htmlAttributes: { src: 'https://sveltejs.github.io/assets/music/strauss.mp3' }
				// 		}
				// 	]
				// },
				// {
				// 	rowID: 7,
				// 	fields: [
				// 		{
				// 			componentName: 'Video',
				// 			htmlAttributes: {
				// 				src: 'https://sveltejs.github.io/assets/caminandes-llamigos.mp4',
				// 				poster: 'https://sveltejs.github.io/assets/caminandes-llamigos.jpg'
				// 			}
				// 		}
				// 	]
				// }
				// {
				// 	rowID: 6,
				// 	fields: [
				// 		{
				// 			componentName: 'Signature',
				// 			htmlAttributes: {}
				// 		}
				// 	]
				// }
			]
		}
		// {
		// 	tab: {
		// 		id: 'two',
		// 		tabOrder: 2,
		// 		label: 'Two',
		// 		dataAttributes: [{ label: 'Custom 2', name: 'custom2', value: false }]
		// 	},
		// 	rows: [
		// 		{
		// 			rowID: 1,
		// 			fields: [
		// 				{
		// 					componentName: 'Text',
		// 					htmlAttributes: {}
		// 				}
		// 			]
		// 		},
		// 		{
		// 			rowID: 2,
		// 			fields: [{ componentName: 'Text', htmlAttributes: {} }]
		// 		},
		// 		{
		// 			rowID: 3,
		// 			fields: [{ componentName: 'Text', htmlAttributes: {} }]
		// 		}
		// 	]
		// }
	];

	// formJSON2 = [];

	let options: BuilderOptions = {
		view: 'build',
		theme: 'Default',
		// styling: {
		// 	root: {
		// 		css: {
		// 			color: 'white',
		// 			backgroundColor: '#121212',
		// 			background: '#121212'
		// 		},
		// 		cssDropDownMenu: {
		// 			backgroundColor: '#121212'
		// 		},
		// 		primaryBackground: '#121212',
		// 		checkboxColor: 'success',
		// 		toolButtonBackgroundColor: 'yellow',
		// 		toolButtonColor: 'black',
		// 		toolButtonHoverBackgroundColor: 'white'
		// 	},
		// 	form: {
		// 		pointerOverComponentBorder: '1px solid black',
		// 		dragNDropHoverBackgroundColor: '#d1ccff',
		// 		emptyFormTextColor: 'black',
		// 		cssDragNDropLeftRight: {
		// 			border: '3px dashed black',
		// 			backgroundColor: '#fafafa',
		// 			borderRadius: '5px',
		// 			height: '32px',
		// 			margin: '10px',
		// 			marginBottom: '10px'
		// 		},
		// 		cssDragNDropTopBottom: {
		// 			border: '1px dashed black',
		// 			backgroundColor: 'yellow',
		// 			borderRadius: '5px',
		// 			height: '16px',
		// 			margin: '10px'
		// 		}
		// 	},
		// 	propertyPanel: {
		// 		propertyPanelHeaderBackground: 'black'
		// 	},
		// 	componentSelection: {
		// 		css: {
		// 			maxHeight: '40vh',
		// 			background: '#121212'
		// 		},
		// 		utilityMenuHoverColor: 'red',
		// 		componentItemHoverBackgroundColor: 'purple'
		// 	},
		// 	tab: {
		// 		activeTabColor: 'white',
		// 		activeTabBackgroundColor: 'purple'
		// 	}
		// },
		builderAPIEvents: {
			onComponentAdded: (field: Field) => {
				if (field.componentName == 'Number') {
					let specialNonRenderedConfig = {
						a: 'x',
						b: 'y',
						c: 'z'
					};
					field.customAttribute = JSON.stringify(specialNonRenderedConfig);
				}

				//Add some default choices
				const fieldInfo = DefinitionManager.getFieldComponent(field);
				if (fieldInfo.componentOptions.hasChoices) {
					if (field.componentName == 'Checkbox Group' || field.componentName == 'Radio Group') {
						field.htmlAttributes.value = [];
					}
					field.choiceConfiguration = {};
					field.choiceConfiguration.choices = [];
					field.choiceConfiguration.choices.push({ label: 'Choice-1', value: 'choice-1' });
					field.choiceConfiguration.choices.push({ label: 'Choice-2', value: 'choice-2' });
					field.choiceConfiguration.enableOther = true;
					field.htmlAttributes.required = true;
				}
				console.log(field);
			},
			onComponentDeleted: (field: Field) => {
				console.log(field);
			},
			onRowDeleted: (rowIndex: number) => {
				console.log(rowIndex);
			},
			onComponentPropertiesOpened: (field: Field) => {
				console.log(field);
			},
			onComponentPropertiesClosed: (field: Field) => {
				console.log(field);
			},
			onTabChanged: (definition: FormDefinition) => {
				console.log(definition);
			},
			onTabAdded: (tab: FormTab) => {
				console.log(tab);
			},
			onTabDeleted: (tab: FormTab) => {
				console.log(tab);
			},
			onViewChanged: (view: views) => {
				console.log(view);
			},
			onFormMounted: (definition: FormDefinition) => {
				console.log(`Tab ${definition.tab?.label} mounted`);
			},
			onAddChoice: (choiceParams: onAddChoiceParams, field: Field) => {
				if (field.choiceConfiguration?.choices) {
					const newChoice = generateUniqueChoice(field.choiceConfiguration.choices, 1, 'choice');
					choiceParams.choice.label = newChoice.label;
					choiceParams.choice.value = newChoice.value;
				}

				if (field.componentName == 'Matrix') {
					const newChoice = generateUniqueChoice(
						field.customAttribute[choiceParams.customAttribute].choices,
						1,
						choiceParams.customAttribute
					);
					choiceParams.choice.label = newChoice.label;
					choiceParams.choice.value = newChoice.value;
				}

				function generateUniqueChoice(
					choices: ChoiceElement[],
					index: number,
					prefix: string
				): ChoiceElement {
					let numItems = choices?.length + index;
					let newChoice: ChoiceElement = {};
					newChoice.label = `${capitalizeFirstLetter(prefix)}-${numItems}`;
					newChoice.value = `${prefix}-${numItems}`;

					while (choices.some((x) => x.value == newChoice.value)) {
						newChoice = generateUniqueChoice(choices, index + 1, prefix);
					}

					return newChoice;
				}
			}
		},
		disabledViews: {
			tools: false,
			render: false,
			settings: false
		},
		disabledBuildTools: {
			getData: false,
			validateDefinition: false,
			clearCurrentTab: false,
			clearData: false
		},
		disabledRenderTools: {
			serialize: false,
			validateForm: false,
			resetForm: false
		},
		customBuildTools: [
			{
				buttonText: 'Surprise Me',
				onClick: (params) => {
					return `<marquee>✨ Alive and kicking! ✨</marquee>`;
				}
			}
		],
		customRenderTools: [
			{
				buttonText: 'Surprise Me',
				onClick: (params) => {
					return `<a target="_blank" style="margin-left:20px" href="https://www.google.com/search?q=marquee+html">🥚</a>`;
				}
			}
		],
		componentSelectionOptions: {
			defaultPoppedOut: false,
			defaultPoppedOutStyle: {}
		},
		disableDragNDropComponents: false,
		editOnAdd: false,
		allowHtmlLabels: true,
		showLabelMaxWidth: false,
		disableComponents: [],
		disableCategories: ['Internal'],
		disabledHtmlAttributes: ['spellcheck', 'id'],
		componentOptions: [
			{
				componentName: 'Text',
				categories: ['Input'],
				keywords: ['Text'],
				events: {
					onkeyup: (e: Event) => {
						//console.log('woohoo?', e);
					},
					onblur: (e: Event) => {
						//console.log('blur', e);
					},
					onfocus: (e: Event) => {
						//console.log('focus', e);
					}
				},
				htmlAttributes: { required: true, placeholder: 'placeholder', class: '', maxlength: null },
				disabledHtmlAttributes: ['spellcheck'],
				dataAttributes: [
					{ label: 'Number field', name: 'numfield', valueType: 'number' },

					{ label: 'Custom 1', name: 'custom1', value: 'hi' },
					{ label: 'Custom 2', name: 'custom2', value: true },
					{ label: 'Custom 3', name: 'custom3', value: true },
					{ label: 'Custom 4', name: 'custom4', value: [1, 2, 3] },
					{ label: 'Custom 5', name: 'custom5', value: { a: '1', b: '2', c: ['a'] } },
					{ name: 'HiddenWithoutLabel', value: false },
					{
						label: 'Custom Options',
						tab: 'Custom Options',
						name: 'custom7',
						options: [
							{ label: 'Red', value: 'option-red' },
							{ label: 'Green', value: 'option-green' },
							{ label: 'Blue', value: 'option-blue' }
						],
						multiple: true
					},
					{ label: 'Newly added on component definition', name: 'custom8', value: false },
					{
						label: 'Special Configuration',
						name: 'custom9',
						isButton: true,
						tab: 'Special',
						buttonHandler: async (e, dataAttribute) => {
							const component = new CustomConfigurator({
								target: document.getElementById('customConfigExampleArea') as HTMLElement,
								props: {
									dataAttribute: dataAttribute
								}
							});
							component.$set({ self: component });
						}
					}
				]
			},
			{
				componentName: 'Button',
				events: {
					onclick: (e: Event) => {
						console.log('click', e);
					}
				}
			},
			{
				componentName: 'Select',
				dataAttributes: [
					{
						label: 'Custom Options',
						name: 'custom7',
						options: [
							{ label: 'Red', value: 'option-red' },
							{ label: 'Green', value: 'option-green' },
							{ label: 'Blue', value: 'option-blue' }
						],
						multiple: false
					}
				]
			},
			{
				componentName: 'Number',
				validateDefinition: (fieldInfo: FieldInfo): ValidationResult => {
					if (!fieldInfo.field.htmlAttributes.class?.includes('form-group')) {
						return {
							field: fieldInfo.field,
							errors: [
								`(Tab ${fieldInfo.tab?.label}) ${fieldInfo.field.labelAttributes?.label} must contain a 'form-group' Class`
							]
						};
					}
				}
			}
		],
		formDefinition: formJSON2,
		tabDataAttributes: [
			{ label: 'Custom 2', name: 'custom2', value: true },
			{
				label: 'Special Configuration',
				name: 'custom9',
				isButton: true,
				tab: 'Special',
				buttonHandler: async (e, dataAttribute) => {
					const component = new CustomConfigurator({
						target: document.getElementById('customConfigExampleArea') as HTMLElement,
						props: {
							dataAttribute: dataAttribute
						}
					});
					component.$set({ self: component });
				}
			}
		],
		confirmRemoveField: false,
		confirmRemoveTab: true
	};
</script>

<FormBuilder {options} />

<div style="height:2000px" />
