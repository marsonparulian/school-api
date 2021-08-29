import { Request, Response, NextFunction } from "express";
import { idShouldExistAndValidInParams } from "../../middlewares/validator.middleware";

/**
 * Middleware to delete school by id
 */
export const deleteSchoolById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(501).json({ message: "Not implemented" });
}

const handlers = [
    idShouldExistAndValidInParams,
    deleteSchoolById,
];
export default handlers;
