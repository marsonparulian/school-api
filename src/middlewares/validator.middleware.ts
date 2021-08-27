// This file contains middlewares related to request validation
import { Request, Response, NextFunction } from "express";
import db, { DAO } from "../services/db/db";
import texts from "../texts";

/**
 * Validate the `-id` is exists in param and the `id` is valid.
 * If not, response with `400 Bad Request`
 */
export const idShouldExistAndValidInParams = (req: Request, res: Response, next: NextFunction): void => {
    // Is `_id` valid ?
    const _id = req.params._id;
    const isValid = _id && db.isIdValid(_id);

    // Is id valid ?
    if (isValid) {
        // Continue to next middleware
        next();
        return;
    }

    // Not valid, send response
    res.status(400).send({
        message: texts.VALID_ID_REQUIRED,
    })
};

/**
 * Create middleware to check if `_id` exist in DB.
 * @param dao {DAO} - DAO object to determine which table / collections to look for
 * @return {function} - Middleware to validate if the id exist or not
 */
export const middlewareIdInParamsShouldExistInDb = (dao: DAO<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get the `_id`
        const _id = req.params._id;

        // Check `_id` in DB
        const doc = await dao.findById(_id).catch((e) => {
            res.status(500).send({
                message: "Unknown server error",
                error: e.message,
            });
            return;
        });

        // If `_id` exist, continue to next middleware
        if (doc) {
            next();
            return;
        }

        // Response 'Not Found'
        res.status(404).send({
            message: texts.ID_NOT_EXIST,
        })
    }
}
