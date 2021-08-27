import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlibs from "../testlib";

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
    test.todo("Update with not existing id");
    afterAll(async () => {
        //Disconnect
        await db.disconnect();
    });
});
