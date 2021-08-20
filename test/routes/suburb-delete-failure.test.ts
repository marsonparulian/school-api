import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This contain failed test cases of suburb deletion
describe("Delete suburb - failures", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Suburb id not provided", async () => {
        // Make request to delete without `_id`
        const response = await supertest(app)
            .delete("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response status should be 400
        expect(response.status).toBe(400)
        // Response body should contain 'valid id is required' message
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        })
    });
    test("Suburb id is not valid id", async () => {
        // Make request with invalid `_id`
        const response = await supertest(app)
            .delete("/api/suburb/223")
            .catch((e) => {
                throw (e);
            });

        // Response body should have 'valid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Response status should be 400
        expect(response.status).toBe(400);
    });
    test("Suburb id not found in DB", async () => {
        // Make request to delete with random `_id`
        const response = await supertest(app)
            .delete("/api/suburb/123456789012345678901234")
            .catch((e) => {
                throw (e);
            });

        // Response status should be 404
        expect(response.status).toBe(404);
        // Response body should contain 'id not found' msg
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        });
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    })
});
