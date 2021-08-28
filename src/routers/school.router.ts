import { Router } from "express";
import schoolSaveController from "../controllers/school/schoolSave.controller";
import schoolUpdateController from "../controllers/school/schoolUpdate.controller";
import * as schoolGetController from "../controllers/school/schoolGet.controller";

// Init Router
const router = Router();

// GET list of school
router.get("/", schoolGetController.getSchool);

// Save new school
router.post("/", schoolSaveController);

// Save existing school
router.put("/:_id", schoolUpdateController);
export default router;
