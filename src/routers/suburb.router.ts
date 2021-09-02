import { Router, Request, Response, NextFunction } from "express";
import suburbSaveController from "../controllers/suburb/suburbSave.controller";
import suburbUpdateController from "../controllers/suburb/suburbUpdate.controller";
import * as suburbGetController from "../controllers/suburb/suburbGet.controller";
import suburbDeleteController from "../controllers/suburb/suburbDelete.controller";

// Router for `suburb` request
const router = Router();

// Handle  GET suburbs
router.get("/",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['Suburb']
        #swagger.description = 'Retrieve all suburbs.'
        #swagger.responses[200] = 'Success'
        */
        next();
    },
    suburbGetController.getSuburbs
);

// Handle GET suburb by id
router.get("/:_id",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
#swagger.tags = ['Suburb']
#swagger.description = 'Retrieve a suburb by ID.'
#swagger.parameters['_id'] = {
    in: 'path',
    type: 'string'
}

*/
        next();
    },
    suburbGetController.getSuburbBydIdPipeline);

// Handle request to save
router.post("/",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['Suburb']
        #swagger.description = 'Create new suburb.'
        #swagger.parameters['SuburbData'] = {
            in: 'body',
            type: 'object',
            schema: { $ref : '#/definitions/SaveSuburb'}
        }
        #swagger.responses[201] = {description: 'Success'}
        #swagger.responses[422] = { description : 'Invalid data'}
        */
        next();
    },
    suburbSaveController
);

// Handle request to update suburb
router.put("/:_id?",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['Suburb']
        #swagger.description = 'Update existing suburb.'
        #swagger.parameters['_id']= {
            in: 'path',
            type: 'string',
        }
        #swagger.parameters['SuburbData'] = {
            in: 'body',
            type: 'object',
            schema: {$ref: "#/definitions/SaveSuburb"}
        }
        #swagger.responses[200] = { description: 'Success.'}
        #swagger.responses[400] = { description: 'Bad request.' }
        #swagger.responses[422] = { description: 'Invalid data.'}
        */
        next();
    },
    suburbUpdateController
);

// Delete suburb by `_id`
router.delete("/:_id?",
    (req: Request, res: Response, next: NextFunction): void => {
        /*
        #swagger.tags = ['Suburb']
        #swagger.description = 'Delete a suburb by ID'
        #swagger.parameters['_id'] = {
            in: 'path',
            type: 'string',
            description: 'ID of the suburb.'
        }
        #swagger.responses[200] = {description: 'Success'}
        #swagger.responses[400] = {description: 'ID not valid'}
        #swagger.responses[404] = {description: 'ID not exist'}
        */
        next();
    },
    suburbDeleteController
);

// Export router
export default router;
