import { Router } from "express";
import schoolSaveController from "../controllers/school/schoolSave.controller";
import schoolUpdateController from "../controllers/school/schoolUpdate.controller";

// Init Router
const router = Router();

// Save new school
router.post("/", schoolSaveController);

// Save existing school
router.put("/:_id", schoolUpdateController);
export default router;
