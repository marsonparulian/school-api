import { Router } from "express";
import schoolSaveController from "../controllers/school/schoolSave.controller";
import schoolUpdateController from "../controllers/school/schoolUpdate.controller";
import * as schoolGetController from "../controllers/school/schoolGet.controller";
import schoolDeleteController from "../controllers/school/schoolDelete.controller";

// Init Router
const router = Router();

// GET list of school
router.get("/", schoolGetController.getSchool);

// GET specific school by id
router.get("/:_id", schoolGetController.validateThenGetSchoolById);

// Save new school
router.post("/", schoolSaveController);

// Save existing school
router.put("/:_id", schoolUpdateController);
// DELETE school by id
router.delete(":_id?", schoolDeleteController);

export default router;
