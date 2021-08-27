import { NextFunction, Request, Response, text } from "express";
import { body, validationResult } from "express-validator";
import { createErrorMessages, isEntityExistInDB } from "../../helpers/validator.helper";
import db from "../../services/db/db";
import texts from "../../texts";

/**
 * Middleware to validate.
 * @param req {Request}
 * @param res {Resposne}
 * @param next {NextFunction}
 */
const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Throw if has errors
        validationResult(req).throw();
        next();
    } catch (e) {
        // Construct error msgs.
        const errors = createErrorMessages(e.array());
        // Send response regarding invalid request
        res.status(422).send({
            // Generic msg
            message: texts.save_failure,
            // validation errors
            errors,
        });
    }
}
/**
 *  Save new / existing school.
 */
const saveSchool = async (req: Request, res: Response): Promise<void> => {
    // Get data from `body`
    const data = req.body;

    // `req.params._id` ?
    if (req.params._id) {
        // Include  in `data`
        data._id = req.params._id;
    }

    // Save
    const school = await db.school.save(data).catch((e) => {
        // Handle unknown error
        console.error("Unknow error saving school", e);
        // Response
        res.status(500).json({
            message: texts.save_failure,
            error: e.message,
        });
    });

    // set `responseStatus`. `201` or `200`
    const responseStatus = req.method.toLowerCase() === "post" ? 201 : 200;

    // Send Response
    res.status(responseStatus).json({
        message: texts.SAVED,
        school,
    });
}

const handlers = [
    // Name field
    body("name").trim()
        .not().isEmpty().withMessage(texts.REQUIRED).bail()
        .escape(),
    // Suburb field
    body("suburb").trim()
        .not().isEmpty().withMessage(texts.REQUIRED).bail()
        // suburb id has to be valid
        .custom(db.isIdValid).withMessage(texts.VALID_ID_REQUIRED).bail()
        // Suburb id should exist in DB
        .custom((value) => isEntityExistInDB(db.suburb, value)).withMessage(texts.ID_NOT_EXIST).bail()
        .escape(),
    validate,
    saveSchool,
];
export default handlers;
