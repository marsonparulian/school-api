// This file contains controllers to handle GET suburbs request
import { Request, Response } from "express";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Send response of array of suburbs
 */
export const getSuburbs = (req: Request, res: Response): void => {
    res.status(200).send({
        message: texts.FETCH_SUCCESS,
        suburbs: [],
    });
}
