import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// This file contain test cases for DELETE `api/school/_id` (delete school)
describe("DELETE /api/school/_id", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    })
    test("Missing id param", async () => {
        // Make request to delete without`_id`
        const response = await supertest(app)
            .delete("/api/school/")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'valid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Response status should be 400
        expect(response.status).toBe(400);
    });
    test.todo("Invalid id param");
    test.todo("Non existing id param in DB");
    test.todo("Successful deleetion");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
