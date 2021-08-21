import { Router } from "express";
import suburbSaveController from "../controllers/suburb/suburbSave.controller";
import suburbUpdateController from "../controllers/suburb/suburbUpdate.controller";
import * as suburbGetController from "../controllers/suburb/suburbGet.controller";
import suburbDeleteController from "../controllers/suburb/suburbDelete.controller";

// Router for `suburb` request
const router = Router();

// Handle  GET suburbs
router.get("/", suburbGetController.getSuburbs);

// Handle GET suburb by id
router.get("/:_id", suburbGetController.getSuburbBydIdPipeline);

// Handle request to save
router.post("/", suburbSaveController);

// Handle request to update suburb
router.put("/:_id?", suburbUpdateController);

// Delete suburb by `_id`
router.delete("/:_id?", suburbDeleteController);

// Export router
export default router;
