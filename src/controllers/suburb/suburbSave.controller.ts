import { Request, Response } from "express";

/**
 * Controller to handle request to save suburb
 */
const saveSuburb = async (req: Request, res: Response): Promise<void> => {

    // FIXME
    res.status(501).end();
}

/**
 * Pipeline of request handlers to save suburb
 */
const handlers = [
    saveSuburb,
];
export default handlers;
