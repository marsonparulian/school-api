import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// This file contains test cases for successful POST /api/school (creating school)
describe("POST /api/school - success", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("School with basic data", async () => {
        // Make request to save suburb
        const saveSuburbResponse = await supertest(app)
            .post("/api/suburb/").send(testlib.suburb2Data)
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveSuburbResponse.status).toBe(201);

        // Persist the suburb id
        const suburbId = saveSuburbResponse.body.suburb._id;

        // Make request to save school
        const saveSchoolResponse = await supertest(app)
            .post("/api/school")
            .send({
                ...testlib.school1Data,
                suburb: suburbId,
            }).catch((e) => {
                throw (e);
            });

        // Response body should contain the saved school data
        expect(saveSchoolResponse.body).toEqual(expect.objectContaining({
            message: texts.SAVED,
            school: expect.objectContaining({
                suburb: suburbId,
                ...testlib.school1Data,
            }),
        }));
        // Response status should be 201
        expect(saveSchoolResponse.status).toBe(201);

        // Persist the school id
        const schoolId = saveSchoolResponse.body._id;

        // Fetch  school directly with `_id`

        // The fetche data should contain the saved school data



    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
})
