import type { FormComponentsType } from '$lib/Utils/types';

export const flavor: 'community' | 'pro' = 'community';

export const DynamicImportMap: Partial<Record<FormComponentsType, Promise<any>>> = {
	Button: import(`../../Components/Button.svelte`),
	Text: import(`../../Components/Text.svelte`),
	Select: import(`../../Components/Select.svelte`),
	Number: import(`../../Components/Number.svelte`),
	Hidden: import(`../../Components/Hidden.svelte`),
	'Text Area': import(`../../Components/Text.svelte`),
	'Checkbox Group': import(`../../Components/Checkbox Group.svelte`),
	'Radio Group': import(`../../Components/Radio Group.svelte`),
	Date: import(`../../Components/Date.svelte`),
	Header: import(`../../Components/Header.svelte`),
	Paragraph: import(`../../Components/Paragraph.svelte`),
	Password: import(`../../Components/Password.svelte`),
	Color: import(`../../Components/Color.svelte`),
	'File Upload': import(`../../Components/File Upload.svelte`),
	Progress: import(`../../Components/Progress.svelte`),
	Meter: import(`../../Components/Meter.svelte`),
	Audio: import(`../../Components/Audio.svelte`),
	Video: import(`../../Components/Video.svelte`),
	Range: import(`../../Components/Range.svelte`),
	DateTime: import(`../../Components/DateTime.svelte`),
	Month: import(`../../Components/Month.svelte`),
	Week: import(`../../Components/Week.svelte`),
	Time: import(`../../Components/Time.svelte`),
	Link: import(`../../Components/Link.svelte`),
	Picture: import(`../../Components/Picture.svelte`),
	Canvas: import(`../../Components/Canvas.svelte`),
	Divider: import(`../../Components/Divider.svelte`),
	Stars: import(`../../Components/Stars.svelte`)
};
