// This file contains middlewares related to request validation
import { Request, Response, NextFunction } from "express";
import db from "../services/db/db";
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
