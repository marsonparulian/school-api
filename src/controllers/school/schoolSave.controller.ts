import { Request, Response } from "express";


/**
 *  Save new / existing school.
 */
const saveSchool = async (req: Request, res: Response): Promise<void> => {
    // FIXME 
    res.status(501).end("Not implemented");
}

const handlers = [
    saveSchool,
];
export default handlers;
