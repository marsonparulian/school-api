import { Router } from "express";
import schoolSaveController from "../controllers/school/schoolSave.controller";

// Init Router
const router = Router();

// Save new school
router.post("/", schoolSaveController);
export default router;
