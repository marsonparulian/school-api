import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
import { createErrorMessages } from "../../helpers/validator.helper";
import db from "../../services/db/db";
import texts from "../../texts";
import { ErrorMessages } from "../../types/common";

/**
 * Middleware to validate data using`express-validator`
 */
const validate = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Throw if has errors
        validationResult(req).throw();
        next();
    } catch (e) {
        // Construct error messages
        const errors: ErrorMessages = createErrorMessages(e.array());

        // Send error messages
        res.status(422).send({
            message: "Failed save suburb.",
            errors,
        })
    }
}
/**
 * Controller to handle request to save suburb
 */
const saveSuburb = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;

    // If any, include `_id` from `req.params`
    if (req.params._id && db.isIdValid(req.params._id)) {
        data._id = req.params._id || "";
    }

    // Save to DB
    const saved = await db.suburb.save(data).catch((e) => {
        console.error("error", e);
        res.status(500).json({
            message: "Unknow error : unable to save suburb.",
        });
    });

    // Set status to `201` if the method is `post`, else set to `200`
    const status = req.method.toUpperCase() === "POST" ? 201 : 200;
    // Send `ok` response
    res.status(status).json({
        message: texts.SAVED,
        suburb: saved,
    });
}

/**
 * Pipeline of request handlers to save suburb
 */
const handlers = [
    // `name`
    body("name").trim().not().isEmpty().withMessage(texts.SUBURB_NAME_REQUIRED).bail()
        .escape()
    ,
    // `postCode`
    body('postCode').trim()
        .exists({ checkFalsy: true }).withMessage(texts.SUBURB_POSTCODE_REQUIRED).bail()
        .matches(/\d{4}/).withMessage(texts.SUBURB_POSTCODE_INVALID).bail()
        .escape()
    ,
    validate,
    saveSuburb,
];
export default handlers;
