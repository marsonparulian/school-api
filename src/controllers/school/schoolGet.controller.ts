import { Request, Response } from "express";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Handle request for schools
 */
export const getSchool = async (req: Request, res: Response): Promise<void> => {
    res.status(501).json({
        message: "Not implemented"
    });
}
/**
 * Handle request for school with specific id
 */
export const getSchoolById = async (req: Request, res: Response): Promise<void> => {
    res.status(501).json({
        message: "Not implemented"
    });
}
