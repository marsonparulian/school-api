import { Router, Request, Response, NextFunction } from "express";
import schoolSaveController from "../controllers/school/schoolSave.controller";
import schoolUpdateController from "../controllers/school/schoolUpdate.controller";
import * as schoolGetController from "../controllers/school/schoolGet.controller";
import schoolDeleteController from "../controllers/school/schoolDelete.controller";

// Init Router
const router = Router();

// GET list of school
router.get("/",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['School']
        #swagger.description = 'Retrieve all schools'
        #swagger.responses[200] = {
            description: 'Success'
        }
        */
        next();
    },
    schoolGetController.getSchool
);

// GET specific school by id
router.get("/:_id",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['School']
        #swagger.description = 'Retrieve a school by id'
        #swagger.parameters['_id']= {
            type: 'string',
            description: 'ID of the school'
        }
        #swagger.responses[200] = { description: 'Success'}
        #swagger.responses[400] = { description: 'Invalid ID'}
        #swagger.responses[404] = { description: 'ID not found'}
        */
        next();
    },
    schoolGetController.validateThenGetSchoolById
);

// Save new school
router.post("/",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['School']
        #swagger.description = 'Create new school'
        #swagger.parameters['SchoolData'] = {
            in: 'body',
            description: 'School data',
            type: 'object',
            schema: { $ref : "#/definitions/SaveSchool"}
        }
        #swagger.responses[201] = {description: 'Success'}
        #swagger.responses[422] = {description: 'Invalid data'}
        */
        next();
    },
    schoolSaveController
);

// Save existing school
router.put("/:_id",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['School']
        #swagger.description = 'Update existing school'
        #swagger.parameters['_id'] = {
            in: 'path',
            description: 'ID of the school to be updated'
        }
        #swagger.parameters['SchoolData'] = {
            in: 'body',
            description: 'School data',
            type: 'object',
            schema: { $ref : "#/definitions/SaveSchool"}
        }
        #swagger.responses[200] = { description: 'Success'}
        #swagger.responses[404] = { description: 'School ID not found'}
        #swagger.responses[422] = {description: 'Invalid data'}
       */
        next();
    },
    schoolUpdateController
);

// DELETE school by id
router.delete("/:_id?",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['School']
        #swagger.description = 'Delete school by ID'
        #swagger.parameters['_id'] = {
            in: 'path',
            description: 'ID of the school'
        }
        #swagger.responses[200] = {description: 'Success'}
        #swagger.responses[404] = {description: 'School ID not found'           }
              */
        next();
    },
    schoolDeleteController
);

export default router;
