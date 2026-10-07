import type { StyleConfig } from '$lib/Utils/types';
export declare const Theme: readonly ['Default', 'Dark'];
export type ThemeType = (typeof Theme)[number];
export declare const ThemeMap: Record<ThemeType, StyleConfig>;
