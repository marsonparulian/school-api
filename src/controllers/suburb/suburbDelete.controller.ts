// This file contains controllers / middlewares to delete suburb
import { Request, Response } from "express";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import db from "../../services/db/db";

/**
 * Delete suburb by provided `_id` in req.params
 */
const deleteSuburb = async (req: Request, res: Response): Promise<void> => {

    // FIXME
    res.status(501).end();
};

const handlers = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.suburb),
    deleteSuburb,
];
export default handlers;
