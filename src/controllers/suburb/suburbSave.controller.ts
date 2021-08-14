import { Request, Response } from "express";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Controller to handle request to save suburb
 */
const saveSuburb = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    // Save to DB
    const saved = await db.suburb.save(data).catch((e) => {
        console.error("error", e);
        res.status(500).json({
            message: "Unknow error : unable to save suburb.",
        });
    });

    // Send `ok` response
    res.status(200).json({
        message: texts.SAVED,
        suburb: saved,
    });
}

/**
 * Pipeline of request handlers to save suburb
 */
const handlers = [
    saveSuburb,
];
export default handlers;
