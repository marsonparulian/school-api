// Helpers for validation related operations

import { Entity, ErrorMessages } from "../types/common";
import { DAO } from "../services/db/db";

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

/**
 *  Custom validator to check if an implementation of DAO<T> exist in DB
 * Return promise. Will resolve if the `T`    exist and will reject if not found.
 * @param dao {DAO<T>} - DAO<T> implementation.
 * @param _id {String} - id of Entity} to look for.
 */
export const isEntityExistInDB = async (dao: DAO<any>, _id: string): Promise<void> => {
    try {
        const result = await dao.findById(_id);

        // Resolve if truthy (found)
        if (result) return Promise.resolve();
        // Reject
        return Promise.reject();

    } catch (e) {
        console.error(`Fatal error : Unable to complete DB operation to find by id : ${_id}`)
        console.error(e);
    }
}
