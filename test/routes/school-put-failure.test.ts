import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// This file contain test cases for PUT `/school/:_id` (update school)
describe("Update school - failed cases", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("With invalid id", async () => {
        // Make request to update with invalid id
        const response = await supertest(app)
            .put("/api/school/--")
            .send({})
            .catch((e) => {
                throw (e);
            });

        // Request body should contain 'valid id is required' msg.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.VALID_ID_REQUIRED,
        }));
        // Response status should be 422
    });
    test("Update with not existing id", async () => {
        // Make request with random id
        const response = await supertest(app)
            .put(`/api/school/${testlib.randomId}`)
            .send({})
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'id not exist' msg.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.ID_NOT_EXIST,
        }));
        // Response status should be 404.
        expect(response.status).toBe(404);
    });
    afterAll(async () => {
        //Disconnect
        await db.disconnect();
    });
});
