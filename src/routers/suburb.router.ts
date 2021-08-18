import { Router } from "express";
import suburbSaveController from "../controllers/suburb/suburbSave.controller";
import { idShouldExistAndValidInParams } from "../middlewares/validator.middleware";

// Router for `suburb` request
const router = Router();

// Handle request to save
router.post("/", suburbSaveController);

// Handle request to update suburb
router.put("/:_id?", idShouldExistAndValidInParams, suburbSaveController);

// Export router
export default router;
