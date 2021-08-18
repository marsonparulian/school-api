// This file contains middlewares related to request validation
import { Request, Response, NextFunction } from "express";
import texts from "../texts";

/**
 * Validate the `-id` is exists in param and the `id` is valid.
 * If not, response with `400 Bad Request`
 */
export const idShouldExistAndValidInParams = (req: Request, res: Response, next: NextFunction): void => {
    // Check and next()
    if (req.params._id) next();

    // Catched 
    res.status(400).send({
        message: texts.VALID_ID_REQUIRED,
    })
};
