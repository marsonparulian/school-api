import schoolSaveController from "./schoolSave.controller";
import { idShouldExistAndValidInParams } from "../../middlewares/validator.middleware";

/**
 * Pipeline used to udpate school
 */
const handlers = [
    idShouldExistAndValidInParams,
    ...schoolSaveController,
]
export default handlers;
