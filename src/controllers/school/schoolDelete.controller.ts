import { Request, Response, NextFunction } from "express";
import db from "../../services/db/db";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import schoolModel from "../../services/db/mongodb/models/schoolModel";
import texts from "../../texts";

/**
 * Middleware to delete school by id
 */
export const deleteSchoolById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Delete school
        const school = await db.school.findByIdAndDelete(req.params._id);

        // Response
        res.status(200).json({
            // if `null`, nothing has been deleted.
            message: school ? texts.DELETE_SUCCESS : texts.DELETE_FAILURE,
            school,
        })
    } catch (e) {
        // Unknown error. Send response
        res.status(500).json({
            message: "Unknow error deleting school",
            school: {
                _id: req.params._id
            }
        })
    }
}

const handlers = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.school),
    deleteSchoolById,
];
export default handlers;
