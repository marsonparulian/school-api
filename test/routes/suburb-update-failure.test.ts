import supertest from "supertest";
import app from "../../src/app";
import texts from "../../src/texts";
import db from "../../src/services/db/db";
import "dotenv/config";

// Update suburb test
describe("Invalid update suburb route test", () => {
    test("id is not provided", async () => {
        // Make request. `id` not provided in URI 
        const response = await supertest(app)
            .put("/api/suburb/")
            .send({})
            .catch((e) => {
                throw (e)
            });

        // Response should be 401 Bad Request
        expect(response.status).toBe(400);
        // Response body should contain 'id is required'
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        })
    });
    test("Invalid id", async () => {
        // Make request, supply invalid `_id`
        const response = await supertest(app)
            .put("/api/suburb/abc")
            .send({})
            .catch((e) => {
                throw (e);
            });

        // Resonse status should be 400
        expect(response.status).toBe(400);
        // Response body should contain 'invalid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        })
    });
    test("id not exist in DB", async () => {
        // Connect to DB
        await db.connect();

        // Make request with non existing `_id`
        const response = await supertest(app)
            .put("/api/suburb/012345678901234567890123")
            .send({})
            .catch((e) => {
                throw (e);
            });
        // Response status should be 404
        expect(response.status).toBe(404);
        // Response body should contain 'id not exist' msg
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        })

        // Disconnect DB
        await db.disconnect();
    });
    test.todo("name is falsy");
    test.todo("postCode is falsy");
})
