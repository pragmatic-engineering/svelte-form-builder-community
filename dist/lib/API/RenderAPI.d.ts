export declare class RenderAPI {
	/**
	 * Get the form data
	 * @param space
	 * @returns JSON
	 */
	static getData(): Promise<string>;
	/**
	 * Check the rendered Form for any validation issues
	 * @returns
	 */
	static validate(): import('../../Utils/types').ValidationError[];
	/**
	 * Reset the form
	 * @param tab
	 * @returns
	 */
	static resetForm(): void;
}
