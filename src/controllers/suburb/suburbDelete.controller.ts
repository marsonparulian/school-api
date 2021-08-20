// This file contains controllers / middlewares to delete suburb
import { Request, Response } from "express";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Delete suburb by provided `_id` in req.params
 */
const deleteSuburb = async (req: Request, res: Response): Promise<void> => {
    // Get the id
    const _id = req.params._id || "";

    try {
        // Delete
        const result = await db.suburb.findByIdAndDelete(_id);

        // Success
        res.status(200).send({
            message: texts.DELETE_SUCCESS,
            suburb: result,
        })
    } catch (e) {
        //  Unknown error
        res.status(500).send({
            message: "Unknown error. Suburb deletion failed.",
            error: e,
            suburb: {
                _id,
            }
        })
    }

    // FIXME
    res.status(501).end();
};

const handlers = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.suburb),
    deleteSuburb,
];
export default handlers;
