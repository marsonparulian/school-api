import { idShouldExistAndValidInParams, middlewareIdInParamsShouldExistInDb } from "../../middlewares/validator.middleware";
import suburbDAO from "../../services/db/mongodb/daos/suburbDAO";
import suburbSaveController from "./suburbSave.controller";

/**
 * Update existing suburb
 */
const handlers = [
    // req.params._id should be a valid id
    idShouldExistAndValidInParams,

    // id should exist in DB
    middlewareIdInParamsShouldExistInDb(suburbDAO),

    // suburb save middleware chain
    ...suburbSaveController,
];
export default handlers;
