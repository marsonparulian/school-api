// Helpers for validation related operations

import { ErrorMessages } from "../types/common";

/**
 * Create key-text pairs for error messages based on `express-validator.validationResult..array()`.
 * @param {object} errorArray - Error array returned from `express-validator.validationResult.array`
 * @return {object} - Key - text pair object with param name as key and error message as value / text.
 */
export const createErrorMessages = (
    errorArray: { param: string, msg: string }[]
): ErrorMessages => {
    return errorArray.reduce((
        acc: ErrorMessages,
        { param, msg }: { param: string, msg: string }
    ) => {
        acc[param] = msg;
        return acc;
    }, {});
}
