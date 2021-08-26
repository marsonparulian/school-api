import { NextFunction, Request, Response, text } from "express";
import { body, validationResult } from "express-validator";
import { createErrorMessages } from "../../helpers/validator.helper";
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
    // FIXME 
    res.status(501).end("Not implemented");
}

const handlers = [
    // Name field
    body("name").trim()
        .not().isEmpty().withMessage(texts.REQUIRED).bail()
        .escape(),
    // Suburb field
    body("suburb").trim()
        .not().isEmpty().withMessage(texts.REQUIRED).bail()
        .escape(),
    validate,
    saveSchool,
];
export default handlers;
