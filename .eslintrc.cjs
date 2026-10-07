module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:svelte/recommended'
	],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'dist', 'package', 'node_modules', '.svelte-kit', '*.d.ts'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	parserOptions: {
		sourceType: 'module',
		extraFileExtensions: ['.svelte'],
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'no-debugger': 'off',
		'no-var': 'off',
		'svelte/no-at-html-tags': 'off',
		'svelte/no-unused-svelte-ignore': 'off',
		'no-unsafe-optional-chaining': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }
		]
	}
};
