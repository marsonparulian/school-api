import { Router } from "express";
import suburbSaveController from "../controllers/suburb/suburbSave.controller";
import suburbUpdateController from "../controllers/suburb/suburbUpdate.controller";
import * as suburbGetController from "../controllers/suburb/suburbGet.controller";

// Router for `suburb` request
const router = Router();

// Handle  GET suburbs
router.get("/", suburbGetController.getSuburbs);

// Handle request to save
router.post("/", suburbSaveController);

// Handle request to update suburb
router.put("/:_id?", suburbUpdateController);

// Export router
export default router;
