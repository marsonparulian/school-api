// This file contains controllers to handle GET suburbs request
import { Request, Response } from "express";
import db from "../../services/db/db";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import texts from "../../texts";

export const getSuburbById = async (req: Request, res: Response): Promise<void> => {
    // Get the id
    const _id = req.params._id || "";

    try {
        const suburb = await db.suburb.findById(_id);

        res.status(200).send({
            message: texts.FETCH_SUCCESS,
            suburb,
        })
    } catch (e) {
        // Unknown error
        res.status(500).send({
            message: "Unknown error. Unable to fetch a suburb",
            error: e,
            suburb: {
                _id,
            }
        })
    }
}

export const getSuburbBydIdPipeline = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.suburb),
    getSuburbById,
]

/**
 * Send response of array of suburbs
 */
export const getSuburbs = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch from DB
        const suburbs = await db.suburb.find();

        // Response
        res.status(200).send({
            message: texts.FETCH_SUCCESS,
            suburbs,
        });
    } catch (e) {
        res.status(500).send({
            message: "Unknown server error."
        });
    }
}
