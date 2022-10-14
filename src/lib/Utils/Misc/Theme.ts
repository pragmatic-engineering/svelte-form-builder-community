import type { StyleConfig } from '$lib/Utils/types';

export const Theme = ['Default', 'Dark'] as const;
export type ThemeType = typeof Theme[number];

export const ThemeMap: Record<ThemeType, StyleConfig> = {
	Default: {
		root: {
			css: {
				color: 'black',
				background: 'white'
			},
			cssDropDownMenu: {
				backgroundColor: '#eee'
			},
			checkboxColor: 'primary',
			toolButtonBackgroundColor: '#fafbfc',
			toolButtonColor: '#24292e',
			toolButtonHoverBackgroundColor: '#f3f4f6'
		},
		header: {
			css: {
				background: '#8AAAE5'
			}
		},
		propertyPanel: {
			propertyPanelHeaderBackground: '#FFFAE7',
			propertyPanelBackground: '#B7CCF4'
		},
		form: {
			pointerOverComponentBorder: '1px solid #00a4bd',
			dragNDropHoverBackgroundColor: 'yellow',
			emptyFormTextColor: 'black',
			cssDragNDropLeftRight: {
				border: '1px dashed #0d99f2',
				backgroundColor: '#e5f5f8',
				borderRadius: '5px',
				height: '32px',
				margin: '10px',
				marginBottom: '10px'
			},
			cssDragNDropTopBottom: {
				border: '1px dashed #0d99f2',
				backgroundColor: '#eaeff0',
				borderRadius: '5px',
				height: '16px',
				margin: '10px'
			}
		},
		componentSelection: {
			css: {
				maxHeight: '50vh',
				background: 'white',
				border: '2px solid black'
			},
			utilityMenuHoverColor: 'purple',
			componentItemHoverBackgroundColor: '#E8EFFD',
			minimizedBorder: '4px solid red'
		},
		tab: {
			activeTabColor: 'black',
			activeTabBackgroundColor: 'white'
		}
	},
	Dark: {
		root: {
			css: {
				color: '#fff',
				background: '#000C1D'
			},
			cssDropDownMenu: {
				backgroundColor: '#122d42'
			},
			checkboxColor: 'primary',
			toolButtonBackgroundColor: '#122d42',
			toolButtonColor: '#ffffffcc',
			toolButtonHoverBackgroundColor: '#7e57c2'
		},
		header: {
			css: {
				background: '#282c34'
			}
		},
		propertyPanel: {
			propertyPanelHeaderBackground: '#5f7e97',
			propertyPanelBackground: '#000C1D'
		},
		form: {
			pointerOverComponentBorder: '1px solid #ffffff',
			dragNDropHoverBackgroundColor: '#5f7e97',
			emptyFormTextColor: '#fff',
			cssDragNDropLeftRight: {
				border: '1px dashed #5f7e9779',
				backgroundColor: '#5f7e97',
				borderRadius: '5px',
				height: '32px',
				margin: '10px',
				marginBottom: '10px'
			},
			cssDragNDropTopBottom: {
				border: '1px dashed #5f7e9779',
				backgroundColor: '#122d42',
				borderRadius: '5px',
				height: '16px',
				margin: '10px'
			}
		},
		componentSelection: {
			css: {
				maxHeight: '50vh',
				background: '#122d42',
				border: '2px solid #7e57c2cc'
			},
			utilityMenuHoverColor: '#7e57c2',
			componentItemHoverBackgroundColor: '#7e57c2',
			minimizedBorder: '4px solid #7e57c2'
		},
		tab: {
			activeTabColor: '#fff',
			activeTabBackgroundColor: '#122d42'
		}
	}
};
