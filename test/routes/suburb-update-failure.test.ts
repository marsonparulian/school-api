import supertest from "supertest";
import app from "../../src/app";

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
        // Response should contain 'id is required'
    });
    test.todo("Invalid id");
    test.todo("id not exist in DB");
    test.todo("name is falsy");
    test.todo("postCode is falsy");
})
