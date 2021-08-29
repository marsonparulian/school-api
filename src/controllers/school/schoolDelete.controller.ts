import { Request, Response, NextFunction } from "express";
import db from "../../services/db/db";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";

/**
 * Middleware to delete school by id
 */
export const deleteSchoolById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(501).json({ message: "Not implemented" });
}

const handlers = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.school),
    deleteSchoolById,
];
export default handlers;
