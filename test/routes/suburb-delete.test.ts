import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import tests from "../../src/texts";

// This file contain test cases to delete suburb by id
describe("Delete suburb by id test cases", () => {
    // Shared variables between tests
    const suburb1Data = { name: "Orange", postCode: "2345" };
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("delete by id", async () => {
        // Drop DB
        await db.dropDatabase();

        // Make request to save a suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb")
            .send(suburb1Data)
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveResponse.status).toBe(201);

        // Persist the `_id`
        const _id: string = saveResponse.body.suburb._id;

        // Make request to fetch suburbs 
        const fetchResponse = await supertest(app)
            .get("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response should contain 1 suburb
        expect(fetchResponse.body.suburbs.length).toBe(1);

        // Make request to delete by `_id`

        // Response should be 200

        // Make request to fetch suburbs

        // Response body should contain 0 suburb
        // Response status should be 200
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
