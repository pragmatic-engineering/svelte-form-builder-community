import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { RenderManager } from '$lib/lib/RenderManager';
import { validateUserInputs } from '$lib/lib/Validation';

export class RenderAPI {
	/**
	 * Get the form data
	 * @param space
	 * @returns JSON
	 */
	static getData() {
		return RenderManager.serialize();
	}

	/**
	 * Check the rendered Form for any validation issues
	 * @returns
	 */
	static validate() {
		return validateUserInputs();
	}

	/**
	 * Reset the form
	 * @param tab
	 * @returns
	 */
	static resetForm() {
		RenderManager.applyDefaultValues();

		DefinitionManager.visitAllFieldInstances((fieldInfo, componentInstance) => {
			//If available, call any custom reset code
			if (componentInstance && componentInstance.customReset) {
				componentInstance.customReset();
			}
		});
	}
}
