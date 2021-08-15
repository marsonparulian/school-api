// Helpers for validation related operations

/**
 * Create key-text pairs for error messages based on `express-validator.validationResult..array()`.
 * @param {object} errorArray - Error array returned from `express-validator.validationResult.array`
 * @return {object} - Key - text pair object with param name as key and error message as value / text.
 */
export const createErrorMessages = (
    errorArray: { param: string, msg: string }[]
): { [key: string]: string } => {
    return errorArray.reduce((
        acc: { [key: string]: string },
        { param, msg }: { param: string, msg: string }
    ) => {
        acc[param] = msg;
        return acc;
    }, {});
}
