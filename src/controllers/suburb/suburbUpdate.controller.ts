import { idShouldExistAndValidInParams } from "../../middlewares/validator.middleware";
import suburbSaveController from "./suburbSave.controller";

/**
 * Update existing suburb
 */
const handlers = [
    // req.params._id should be a valid id
    idShouldExistAndValidInParams,
    // suburb save middleware chain
    ...suburbSaveController,
];
export default handlers;
