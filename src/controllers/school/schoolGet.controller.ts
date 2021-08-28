import { Request, Response } from "express";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Handle request for schools
 */
export const getSchool = async (req: Request, res: Response): Promise<void> => {
    try {
        // DB call
        const schools = await db.school.find().catch((e) => {
            throw (e);
        });

        // Response
        res.status(200).json({
            message: texts.FETCH_SUCCESS,
            schools
        })
    } catch (e) {
        res.status(500).json({
            message: texts.FETCH_FAILURE,
            error: e.message,
        });
    }
}
/**
 * Handle request for school with specific id
 */
export const getSchoolById = async (req: Request, res: Response): Promise<void> => {
    res.status(501).json({
        message: "Not implemented"
    });
}
