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
];
export const ProComponents = ['RichText', 'Matrix', 'AutoComplete', 'Signature', 'Table'];
export const TooltipPosition = [
	'right',
	'up',
	'down',
	'left',
	'up-left',
	'up-right',
	'down-left',
	'down-right'
];
export const TooltipSize = ['large', 'small', 'medium', 'xlarge', 'fit'];
export const ChoiceShapeStyle = ['square', 'curve', 'round'];
export const ChoiceSwitchStyle = ['outline', 'fill', 'slim'];
export const ChoiceFillStyle = ['fill', 'thick'];
export const ChoiceAnimationStyle = ['smooth', 'pulse', 'tada', 'jelly', 'rotate'];
export const ChoiceColorStyle = ['primary', 'success', 'warning', 'info', 'danger'];
export var ConditionMatchOn;
(function (ConditionMatchOn) {
	ConditionMatchOn[(ConditionMatchOn['Any'] = 0)] = 'Any';
	ConditionMatchOn[(ConditionMatchOn['All'] = 1)] = 'All';
})(ConditionMatchOn || (ConditionMatchOn = {}));
export var TargetOption;
(function (TargetOption) {
	TargetOption[(TargetOption['Value'] = 0)] = 'Value';
	TargetOption[(TargetOption['PreDefinedValue'] = 1)] = 'PreDefinedValue';
	TargetOption[(TargetOption['OtherField'] = 2)] = 'OtherField';
})(TargetOption || (TargetOption = {}));
export var TermOperator;
(function (TermOperator) {
	TermOperator[(TermOperator['Equals'] = 0)] = 'Equals';
	TermOperator[(TermOperator['NotEquals'] = 1)] = 'NotEquals';
	TermOperator[(TermOperator['StartsWith'] = 2)] = 'StartsWith';
	TermOperator[(TermOperator['NotStartsWith'] = 3)] = 'NotStartsWith';
	TermOperator[(TermOperator['EndsWith'] = 4)] = 'EndsWith';
	TermOperator[(TermOperator['NotEndsWith'] = 5)] = 'NotEndsWith';
	TermOperator[(TermOperator['GreaterThan'] = 6)] = 'GreaterThan';
	TermOperator[(TermOperator['LessThan'] = 7)] = 'LessThan';
	TermOperator[(TermOperator['Before'] = 8)] = 'Before';
	TermOperator[(TermOperator['After'] = 9)] = 'After';
	TermOperator[(TermOperator['IsFilled'] = 10)] = 'IsFilled';
	TermOperator[(TermOperator['IsEmpty'] = 11)] = 'IsEmpty';
	TermOperator[(TermOperator['DoesNotContain'] = 12)] = 'DoesNotContain';
	TermOperator[(TermOperator['Contains'] = 13)] = 'Contains';
})(TermOperator || (TermOperator = {}));
export var ConditionActionOption;
(function (ConditionActionOption) {
	ConditionActionOption[(ConditionActionOption['None'] = 0)] = 'None';
	ConditionActionOption[(ConditionActionOption['Show'] = 1)] = 'Show';
	ConditionActionOption[(ConditionActionOption['Hide'] = 2)] = 'Hide';
	ConditionActionOption[(ConditionActionOption['Require'] = 3)] = 'Require';
	ConditionActionOption[(ConditionActionOption['UnRequire'] = 4)] = 'UnRequire';
	ConditionActionOption[(ConditionActionOption['Enable'] = 5)] = 'Enable';
	ConditionActionOption[(ConditionActionOption['Disable'] = 6)] = 'Disable';
	ConditionActionOption[(ConditionActionOption['ShowTab'] = 7)] = 'ShowTab';
	ConditionActionOption[(ConditionActionOption['HideTab'] = 8)] = 'HideTab';
	ConditionActionOption[(ConditionActionOption['ActivateTab'] = 9)] = 'ActivateTab';
	ConditionActionOption[(ConditionActionOption['SkipToField'] = 10)] = 'SkipToField';
	ConditionActionOption[(ConditionActionOption['ShowMessage'] = 11)] = 'ShowMessage';
	ConditionActionOption[(ConditionActionOption['Clear'] = 12)] = 'Clear';
	ConditionActionOption[(ConditionActionOption['Copy'] = 13)] = 'Copy';
	ConditionActionOption[(ConditionActionOption['Calculation'] = 14)] = 'Calculation';
})(ConditionActionOption || (ConditionActionOption = {}));
