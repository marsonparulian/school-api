import { Router } from "express";
import suburbSaveController from "../controllers/suburb/suburbSave.controller";

// Router for `suburb` request
const router = Router();

// Handle request to save
router.post("/", suburbSaveController);


// Export router
export default router;
