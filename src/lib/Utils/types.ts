//                              Definitions
//***************************************************************************************/
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HTMLAttributes } from '$lib/Utils/other-types/svelte-types';

export const FormComponents = [
	'Button',
	'Text',
	'RichText',
	'Matrix',
	'Select',
	'Number',
	'Hidden',
	'Text Area',
	'Checkbox Group',
	'Radio Group',
	'Date',
	'Header',
	'Paragraph',
	'Password',
	'Color',
	'File Upload',
	'AutoComplete',
	'Progress',
	'Meter',
	'Audio',
	'Video',
	'Range',
	'DateTime',
	'Month',
	'Week',
	'Time',
	'Link',
	'Picture',
	'Canvas',
	'Signature',
	'Divider',
	'Table',
	'Stars'
] as const;
export type FormComponentsType = typeof FormComponents[number];

export type PartialFormComponents = Partial<FormComponentsType[]>;
export const ProComponents: Readonly<PartialFormComponents> = [
	'RichText',
	'Matrix',
	'AutoComplete',
	'Signature',
	'Table'
] as const;
export type ProComponentsType = typeof ProComponents[number];

export interface Field {
	componentName: FormComponentsType;
	htmlAttributes: HTMLAttributes<HTMLElement>;
	choiceConfiguration?: ChoiceConfiguration; //Hold configuration for choice-type fields (select, checkbox-group, radio-group, etc)
	dataAttributes?: CustomDataAttribute[];
	tooltipAttributes?: TooltipConfiguration;
	defaultValue?: any;
	prevValue?: any;
	hidden?: boolean; //Should field be hidden?
	labelAttributes?: FieldLabel;
	customAttribute?: any; //User-defined for anything
}

export interface FieldLabel {
	label: string;
	style?: string;
	maxWidth?: number | string | undefined | null;
}

export interface TooltipConfiguration {
	text?: string;
	position?: TooltipPositionType;
	size?: TooltipPositionType;
}

export const TooltipPosition = [
	'right',
	'up',
	'down',
	'left',
	'up-left',
	'up-right',
	'down-left',
	'down-right'
] as const;
export type TooltipPositionType = typeof TooltipPosition[number];

export const TooltipSize = ['large', 'small', 'medium', 'xlarge', 'fit'] as const;
export type TooltipSizeType = typeof TooltipSize[number];

export interface ChoiceConfiguration {
	initialBlankChoice?: boolean; //Select
	isSwitch?: boolean; //Checkbox/Radio
	checkIcon?: boolean; //Checkbox/Radio
	svg?: boolean; //True if using checkIcon
	switchStyle?: ChoiceSwitchStyleType; //Checkbox/Radio
	shape?: ChoiceShapeStyleType; //Checkbox/Radio (not set in property panel)
	fillStyle?: ChoiceFillStyleType;
	animation?: ChoiceAnimationStyleType;
	solidColor?: ChoiceColorType;

	inline?: boolean; //Checkbox/Radio

	//Enable the user to enter an unlisted option
	enableOther?: boolean; //Checkbox/Radio
	choices?: ChoiceElement[];
}

export type ChoiceElement = Partial<HTMLOptionElement>;

export const ChoiceShapeStyle = ['square', 'curve', 'round'] as const;
export type ChoiceShapeStyleType = typeof ChoiceShapeStyle[number];

export const ChoiceSwitchStyle = ['outline', 'fill', 'slim'] as const;
export type ChoiceSwitchStyleType = typeof ChoiceSwitchStyle[number];

export const ChoiceFillStyle = ['fill', 'thick'] as const;
export type ChoiceFillStyleType = typeof ChoiceFillStyle[number];

export const ChoiceAnimationStyle = ['smooth', 'pulse', 'tada', 'jelly', 'rotate'] as const;
export type ChoiceAnimationStyleType = typeof ChoiceAnimationStyle[number];

export const ChoiceColorStyle = ['primary', 'success', 'warning', 'info', 'danger'] as const;
export type ChoiceColorType = typeof ChoiceColorStyle[number];

export interface CustomDataAttribute {
	label?: string; //If no label is specified, it will not be shown in the property editor
	tab?: string; //If no tab is specified, it will be shown in the General tab
	name: string;
	value?: any;
	options?: Partial<HTMLOptionElement>[];
	multiple?: boolean;
	valueType?: valueType; //Don't use typeof for value. This helps when a number type goes to blank value or you don't want to set an initial default value
	isButton?: boolean; //Show as a button
	buttonHandler?: (e: Event, dataAttribute: CustomDataAttribute) => any;
}

type valueType = 'number' | 'boolean' | 'string';

export interface FormDefinition {
	tab?: FormTab;
	rows: DefinitionRows[];
}

export interface DefinitionRows {
	rowID: number;
	fields: Field[];
}

export interface FormTab {
	id: string;
	label?: string;
	tabOrder?: number;
	dataAttributes?: CustomDataAttribute[];
}

//                              Options
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponentTyped } from 'svelte';
import type { DOMAttributes } from '$lib/Utils/other-types/svelte-types';
import type { ColumnComponent } from 'tabulator-tables';
import type { ThemeType } from '$lib/Utils/Misc/Theme';

export interface BuilderOptions {
	componentOptions?: ComponentOptions[];
	disableComponents?: FormComponentsType[];
	disableCategories?: string[]; //Disables categories
	disabledHtmlAttributes?: HTMLAttributesKeys[]; //(Global) Hides these from being visible as properties user can change
	formDefinition: FormDefinition[];
	tabDataAttributes?: CustomDataAttribute[];
	activeTabOrderValue?: number;
	enableTabs?: boolean;
	confirmRemoveField?: boolean;
	confirmRemoveTab?: boolean;

	showLabelStyle?: boolean;
	showLabelMaxWidth?: boolean;

	builderAPIEvents?: BuilderAPIEvents;
	allowHtmlLabels?: boolean; //Render labels with @html
	editOnAdd?: boolean; //Automatically open property panel after adding field manually
	disabledViews?: DisabledViews;
	componentSelectionOptions?: ComponentSelectionOptions;
	disableDragNDropComponents?: boolean; //Disables dragging components inside the stage
	disableDragNDropComponentSelection?: boolean; //Disables dragging components from component selection
	disableDragNDropTabs?: boolean; //Disables dragging(reordering) tabs
	disabledBuildTools?: DisabledBuildTools;
	customBuildTools?: CustomToolButton[];
	customRenderTools?: CustomToolButton[];
	disabledRenderTools?: DisabledRenderTools;
	view?: views;
	theme?: ThemeType;
	styling?: StyleConfig;
	conditions?: Condition[];
}

export interface StyleConfig {
	root?: RootStyles;
	header?: HeaderStyles;
	propertyPanel?: PropertyPanelStyles;
	form?: FormStyles;
	componentSelection?: ComponentSelectionStyles;
	tab?: TabStyles;
}

export interface RootStyles {
	checkboxColor?: ChoiceColorType;
	css?: Partial<CSSStyleDeclaration>;
	cssDropDownMenu?: Partial<CSSStyleDeclaration>;
	toolButtonColor?: string;
	toolButtonBackgroundColor?: string;
	toolButtonHoverBackgroundColor?: string;
}

export interface HeaderStyles {
	css?: Partial<CSSStyleDeclaration>;
}

export interface PropertyPanelStyles {
	propertyPanelHeaderBackground?: string;
	propertyPanelBackground?: string;
	propertyPanelTop?: string;
}

export interface FormStyles {
	pointerOverComponentBorder?: string;
	dragNDropHoverBackgroundColor?: string;
	emptyFormTextColor?: string;
	emptyFormMinHeight?: string;
	cssDragNDropLeftRight?: Partial<CSSStyleDeclaration>;
	cssDragNDropTopBottom?: Partial<CSSStyleDeclaration>;
}

export interface ComponentSelectionStyles {
	componentItemHoverBackgroundColor?: string;
	utilityMenuHoverColor?: string;
	css?: Partial<CSSStyleDeclaration>;
	minimizedBorder?: string;
}

export interface TabStyles {
	activeTabColor?: string;
	activeTabBackgroundColor?: string;
}

interface CustomToolButton {
	buttonText: string;
	onClick: (customToolButtonParams: unknown) => any;
}

interface ComponentSelectionOptions {
	defaultPoppedOut?: boolean;
	defaultPoppedOutStyle?: Partial<CSSStyleDeclaration>; //Assign initial css props if defaultPoppedOut = true
}

interface DisabledViews {
	settings?: boolean;
	render?: boolean;
	tools?: boolean;
	conditions?: boolean;
}

interface DisabledBuildTools {
	getData?: boolean;
	validateDefinition?: boolean;
	clearCurrentTab?: boolean;
	clearData?: boolean;
	exportDefinition?: boolean;
	importDefinition?: boolean;
}

interface DisabledRenderTools {
	serialize?: boolean;
	validateForm?: boolean;
	resetForm?: boolean;
}

interface BuilderAPIEvents {
	onComponentAdded?: (field: Field) => any;
	onComponentDeleted?: (field: Field) => any;
	onRowDeleted?: (rowIndex: number) => any;
	onComponentPropertiesOpened?: (field: Field) => any;
	onComponentPropertiesClosed?: (field: Field) => any;
	onTabChanged?: (definition: FormDefinition) => any;
	onTabAdded?: (tab: FormTab) => any;
	onTabDeleted?: (tab: FormTab) => any;
	onComponentImported?: (componentImport: ComponentImport) => any;
	onFormMounted?: (definition: FormDefinition) => any;
	onViewChanged?: (view: views) => any;
	onAddChoice?: (params: onAddChoiceParams, field: Field) => any;
}

export interface onAddChoiceParams {
	choice: ChoiceElement;
	choiceConfiguration: ChoiceConfiguration | undefined;
	customAttribute?: any;
}

export interface ComponentImport {
	component: SvelteFBComponent;
	//componentExport: ComponentExport;
	componentOptions: ComponentOptions;
}

export interface SvelteFBComponent {
	$set(props: { show?: boolean; field?: Field }): unknown;
	component: new (...args: any) => SvelteComponentTyped;
	validateDefinition?: () => ValidationResult; //Validation when defining the field
	validateUserInput?: () => ValidationResult; //Validation when using the field
	customGetUserData?: () => any; //Method to get the component user data in a custom way. It would be typically used for special non-standard HTML inputs (i.e TinyMCE) that don't use htmlAttribute.value
	customSetUserData?: (data: any) => any; //Method to set the component user data in a custom way (if not using htmlAttribute.value)

	customFormDefinitionSerialization?: () => Field; //Would be used for custom serialization for form definition
	customReset?: () => any; //Optional. Called when resetting the form for special circumstances
	customClear?: () => any; //Optional. Special code to clear the component value
	triggerConditionChange?: () => any; //Optional. Tell condition manager to force evaluate the field
	getField?: () => Field;

	isEmpty?: () => boolean; //Condition override
	isFilled?: () => boolean; //Condition override
}

export interface TableFBComponent extends SvelteFBComponent {
	getSelectedColumn: () => ColumnComponent;
	setSelectedColumn: (column: ColumnComponent) => void;
}

export interface ComponentSelectionMetaData {
	categories?: string[]; //ComponentOptions + ComponentExport
	keywords?: string[]; //ComponentOptions + ComponentExport
	icon?: string; //ComponentOptions > ComponentExport
}

export interface ComponentDOMAttributes {
	dataAttributes?: CustomDataAttribute[];

	/*
  Additive to any existing but can also modify any existing by matching on the attribute name.
  To remove an attribute from the display you can override and set label to nothing, or you can add a brand new entry using this array
*/
	htmlAttributes?: HTMLAttributes<HTMLElement>;
}

export interface ComponentOptions extends ComponentSelectionMetaData, ComponentDOMAttributes {
	componentName: FormComponentsType;
	customImport?: Promise<any>;
	validateDefinition?: (fieldInfo: FieldInfo) => ValidationResult; //Additive if also defined in component
	validateUserInput?: (fieldInfo: FieldInfo) => ValidationResult; //Additive if also defined in component
	events?: DOMAttributes;
	customEvents?: any;
	disabledQuickMenu?: QuickMenuOptions;
	fieldGroup?: FieldGroup[]; // This component is a shell for creating multiple pre-defined components at one time as a group

	//---------------------ComponentExport
	hasChoices?: boolean; //Flags this component as something has choices the user can add i.e (select,checkbox-group,radio-group)

	noTooltipProperties?: boolean; //Flags this component as something where the help/tooltips are irrelevant so hide those properties

	//(Component) Hides these from being visible as properties user can change
	disabledHtmlAttributes?: HTMLAttributesKeys[]; //ComponentOptions + ComponentExport
	disableStandardHTMLValidityCheck?: boolean; //Disables the standard call to validateStandardHtmlAttributes

	customAttribute?: any; //User-defined for anything
}

export interface FieldGroup {
	fields: Field[];
}

interface QuickMenuOptions {
	edit?: boolean;
	copy?: boolean;
	delete?: boolean;
}

//                              Utility
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
/* eslint-disable @typescript-eslint/no-explicit-any */

export type HTMLAttributesKeys = keyof HTMLAttributes<HTMLElement>;

export type ValidationResult = ValidationError[] | ValidationError | undefined;

export interface ValidationError {
	field: Field;
	tab?: FormTab;
	errors: string[];
	validity?: ValidityState;
}

export type views = 'build' | 'settings' | 'render' | 'preview' | 'conditions';

export interface SerializeResult {
	name: string;
	value: any;
	componentName: string | FormComponentsType;
}

export interface FieldInfo {
	field: Field;
	row: number;
	fieldIndex: number;
	tab: FormTab;
	componentImport: ComponentImport;
}

export interface FileUploadSerialization {
	name: string;
	size: number;
	type: string;
	base64: string;
}

export interface GroupItemField {
	groupHeader: string;
	items: GroupItem[];
}

export interface GroupItem {
	value: string | number;
	text: string;
}

//                              Conditions
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
//***************************************************************************************/
export interface Condition {
	id: string;
	disabled?: boolean;
	priority: number;
	matchOn: ConditionMatchOn;
	terms: ConditionTerm[];
	actions: ConditionAction[];
	isActivated?: boolean;
}

export enum ConditionMatchOn {
	Any = 0,
	All = 1
}

export interface ConditionTerm {
	id: string;
	fieldName: string;
	field?: Field;
	termOperator: TermOperator;
	value?: string;
	targetFieldName?: string;
	valueType?: TargetOption | undefined;
}

export enum TargetOption {
	Value = 0,
	PreDefinedValue = 1,
	OtherField = 2
}
export enum TermOperator {
	Equals = 0,
	NotEquals = 1,
	StartsWith = 2,
	NotStartsWith = 3,
	EndsWith = 4,
	NotEndsWith = 5,
	GreaterThan = 6,
	LessThan = 7,
	Before = 8,
	After = 9,
	IsFilled = 10,
	IsEmpty = 11,
	DoesNotContain = 12,
	Contains = 13
}

export interface ConditionAction {
	id: string;
	action: ConditionActionOption;
	objectNames?: string[];
	isActivated?: boolean;
	message?: ConditionActionMessageInfo;
	equation?: string;
	decimalPlaces?: number;
	targetObjectName?: string; //Used to specify another object name (like for Copy or Calculation action)
}

export interface ConditionActionMessageInfo {
	text: string;
	duration?: number;
	type?: 'success' | 'info' | 'error' | 'warning';
	color?: string;
	barColor?: string;
	backgroundColor?: string;
}

export enum ConditionActionOption {
	None = 0,
	Show = 1,
	Hide = 2,
	Require = 3,
	UnRequire = 4,
	Enable = 5,
	Disable = 6,
	ShowTab = 7,
	HideTab = 8,
	ActivateTab = 9,
	SkipToField = 10,
	ShowMessage = 11,
	Clear = 12,
	Copy = 13,
	Calculation = 14
}
