import type { StyleConfig } from '$lib/Utils/types';

export const Theme = ['Default', 'Light'] as const;
export type ThemeType = typeof Theme[number];

export const ThemeMap: Record<ThemeType, StyleConfig> = {
	Default: {
		primaryBackground: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
		propertyPanelHeaderBackground:
			'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%) #989898',
		checkboxColor: 'primary',
		pointerOverComponentBorder: '1px solid #00a4bd',
		dragNDropHoverBackgroundColor: 'yellow',
		dragNDropLeftRightStyle: {
			border: '1px dashed #0d99f2',
			backgroundColor: '#e5f5f8',
			borderRadius: '5px',
			height: '32px',
			margin: '10px',
			marginBottom: '10px'
		},
		dragNDropTopBottomStyle: {
			border: '1px dashed #0d99f2',
			backgroundColor: '#eaeff0',
			borderRadius: '5px',
			height: '16px',
			margin: '10px'
		}
	},
	Light: {
		primaryBackground:
			'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)',
		propertyPanelHeaderBackground: 'black',
		checkboxColor: 'success',
		pointerOverComponentBorder: '1px solid black',
		dragNDropHoverBackgroundColor: '#d1ccff',
		dragNDropLeftRightStyle: {
			border: '3px dashed black',
			backgroundColor: '#fafafa',
			borderRadius: '5px',
			height: '32px',
			margin: '10px',
			marginBottom: '10px'
		},
		dragNDropTopBottomStyle: {
			border: '1px dashed black',
			backgroundColor: '#eaeff0',
			borderRadius: '5px',
			height: '16px',
			margin: '10px'
		}
	}
};
