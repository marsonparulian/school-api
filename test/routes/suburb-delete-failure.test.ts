import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This contain failed test cases of suburb deletion
describe("Delete suburb - failures", () => {
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
    test.todo("Suburb id is not valid id");
    test.todo("Suburb id not found in DB");
});
