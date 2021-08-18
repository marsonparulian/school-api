import supertest from "supertest";
import app from "../../src/app";
import texts from "../../src/texts";

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
    test.todo("id not exist in DB");
    test.todo("name is falsy");
    test.todo("postCode is falsy");
})
