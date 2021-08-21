import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This file contains test cases for successful GET specific suburb by id
describe("GET suburb by id - success", () => {
    // Data
    const suburb1Data = { name: "Burwood", postCode: "8844" };
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test("Basic data", async () => {
        // Make request to save suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb")
            .send(suburb1Data)
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveResponse.status).toBe(201);

        // Persist the id
        const _id = saveResponse.body.suburb._id;

        // Make request to fetch the suburb by id
        const fetchResponse = await supertest(app)
            .get(`/api/suburb/${_id}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain the suburb
        expect(fetchResponse.body).toEqual({
            message: texts.FETCH_SUCCESS,
            suburb: expect.objectContaining({
                _id,
                ...suburb1Data,
            }),
        });
        // Response status should be200
        expect(fetchResponse.status).toBe(200)
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
