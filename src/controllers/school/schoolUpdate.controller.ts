import schoolSaveController from "./schoolSave.controller";
import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import db from "../../services/db/db";

/**
 * Pipeline used to udpate school
 */
const handlers = [
    idShouldExistAndValidInParams,
    middlewareIdInParamsShouldExistInDb(db.school),
    ...schoolSaveController,
]
export default handlers;
