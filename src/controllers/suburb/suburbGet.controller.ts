// This file contains controllers to handle GET suburbs request
import { Request, Response } from "express";
import db from "../../services/db/db";
import texts from "../../texts";

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
