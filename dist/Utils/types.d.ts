import type { HTMLAttributes } from '$lib/Utils/other-types/svelte-types';
export declare const FormComponents: readonly [
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
];
export type FormComponentsType = (typeof FormComponents)[number];
export type PartialFormComponents = Partial<FormComponentsType[]>;
export declare const ProComponents: Readonly<PartialFormComponents>;
export type ProComponentsType = (typeof ProComponents)[number];
export interface Field {
	componentName: FormComponentsType;
	htmlAttributes: HTMLAttributes<HTMLElement>;
	choiceConfiguration?: ChoiceConfiguration;
	dataAttributes?: CustomDataAttribute[];
	tooltipAttributes?: TooltipConfiguration;
	defaultValue?: any;
	prevValue?: any;
	hidden?: boolean;
	labelAttributes?: FieldLabel;
	customAttribute?: any;
}
export interface FieldLabel {
	label: string;
	style?: string;
	maxWidth?: number | string | undefined | null;
}
export interface TooltipConfiguration {
	text?: string;
	position?: TooltipPositionType;
	size?: TooltipSizeType;
}
export declare const TooltipPosition: readonly [
	'right',
	'up',
	'down',
	'left',
	'up-left',
	'up-right',
	'down-left',
	'down-right'
];
export type TooltipPositionType = (typeof TooltipPosition)[number];
export declare const TooltipSize: readonly ['large', 'small', 'medium', 'xlarge', 'fit'];
export type TooltipSizeType = (typeof TooltipSize)[number];
export interface ChoiceConfiguration {
	initialBlankChoice?: boolean;
	isSwitch?: boolean;
	checkIcon?: boolean;
	svg?: boolean;
	switchStyle?: ChoiceSwitchStyleType;
	shape?: ChoiceShapeStyleType;
	fillStyle?: ChoiceFillStyleType;
	animation?: ChoiceAnimationStyleType;
	solidColor?: ChoiceColorType;
	inline?: boolean;
	enableOther?: boolean;
	choices?: ChoiceElement[];
}
export type ChoiceElement = Partial<HTMLOptionElement> & {
	labelElement?: HTMLInputElement;
	valueElement?: HTMLInputElement;
};
export declare const ChoiceShapeStyle: readonly ['square', 'curve', 'round'];
export type ChoiceShapeStyleType = (typeof ChoiceShapeStyle)[number];
export declare const ChoiceSwitchStyle: readonly ['outline', 'fill', 'slim'];
export type ChoiceSwitchStyleType = (typeof ChoiceSwitchStyle)[number];
export declare const ChoiceFillStyle: readonly ['fill', 'thick'];
export type ChoiceFillStyleType = (typeof ChoiceFillStyle)[number];
export declare const ChoiceAnimationStyle: readonly ['smooth', 'pulse', 'tada', 'jelly', 'rotate'];
export type ChoiceAnimationStyleType = (typeof ChoiceAnimationStyle)[number];
export declare const ChoiceColorStyle: readonly ['primary', 'success', 'warning', 'info', 'danger'];
export type ChoiceColorType = (typeof ChoiceColorStyle)[number];
export interface CustomDataAttribute {
	label?: string;
	tab?: string;
	name: string;
	value?: any;
	options?: Partial<HTMLOptionElement>[];
	multiple?: boolean;
	valueType?: valueType;
	isButton?: boolean;
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
import type { DOMAttributes } from '$lib/Utils/other-types/svelte-types';
import type { ColumnComponent } from 'tabulator-tables';
import type { ThemeType } from '$lib/Utils/Misc/Theme';
export interface BuilderOptions {
	componentOptions?: ComponentOptions[];
	disableComponents?: FormComponentsType[];
	disableCategories?: string[];
	disabledHtmlAttributes?: HTMLAttributesKeys[];
	formDefinition: FormDefinition[];
	tabDataAttributes?: CustomDataAttribute[];
	activeTabOrderValue?: number;
	enableTabs?: boolean;
	confirmRemoveField?: boolean;
	confirmRemoveTab?: boolean;
	showLabelStyle?: boolean;
	showLabelMaxWidth?: boolean;
	builderAPIEvents?: BuilderAPIEvents;
	allowHtmlLabels?: boolean;
	editOnAdd?: boolean;
	disabledViews?: DisabledViews;
	componentSelectionOptions?: ComponentSelectionOptions;
	disableDragNDropComponents?: boolean;
	disableDragNDropComponentSelection?: boolean;
	disableDragNDropTabs?: boolean;
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
	defaultPoppedOutStyle?: Partial<CSSStyleDeclaration>;
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
	component: any;
	componentOptions: ComponentOptions;
}
export interface SvelteFBComponent {
	$set(props: { show?: boolean; field?: Field }): unknown;
	validateDefinition?: () => ValidationResult;
	validateUserInput?: () => ValidationResult;
	customGetUserData?: () => any;
	customSetUserData?: (data: any) => any;
	customFormDefinitionSerialization?: () => Field;
	customReset?: () => any;
	customClear?: () => any;
	triggerConditionChange?: () => any;
	getField?: () => Field;
	isEmpty?: () => boolean;
	isFilled?: () => boolean;
}
export interface TableFBComponent extends SvelteFBComponent {
	getSelectedColumn: () => ColumnComponent;
	setSelectedColumn: (column: ColumnComponent) => void;
}
export interface ComponentSelectionMetaData {
	categories?: string[];
	keywords?: string[];
	icon?: string;
}
export interface ComponentDOMAttributes {
	dataAttributes?: CustomDataAttribute[];
	htmlAttributes?: HTMLAttributes<HTMLElement>;
}
export interface ComponentOptions extends ComponentSelectionMetaData, ComponentDOMAttributes {
	componentName: FormComponentsType;
	customImport?: Promise<any>;
	validateDefinition?: (fieldInfo: FieldInfo) => ValidationResult;
	validateUserInput?: (fieldInfo: FieldInfo) => ValidationResult;
	events?: DOMAttributes;
	customEvents?: any;
	disabledQuickMenu?: QuickMenuOptions;
	fieldGroup?: FieldGroup[];
	hasChoices?: boolean;
	noTooltipProperties?: boolean;
	disabledHtmlAttributes?: HTMLAttributesKeys[];
	disableStandardHTMLValidityCheck?: boolean;
	customAttribute?: any;
}
export interface FieldGroup {
	fields: Field[];
}
interface QuickMenuOptions {
	edit?: boolean;
	copy?: boolean;
	delete?: boolean;
}
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
export interface Condition {
	id: string;
	disabled?: boolean;
	priority: number;
	matchOn: ConditionMatchOn;
	terms: ConditionTerm[];
	actions: ConditionAction[];
	isActivated?: boolean;
}
export declare enum ConditionMatchOn {
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
export declare enum TargetOption {
	Value = 0,
	PreDefinedValue = 1,
	OtherField = 2
}
export declare enum TermOperator {
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
	targetObjectName?: string;
}
export interface ConditionActionMessageInfo {
	text: string;
	duration?: number;
	type?: 'success' | 'info' | 'error' | 'warning';
	color?: string;
	barColor?: string;
	backgroundColor?: string;
}
export declare enum ConditionActionOption {
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
export {};
