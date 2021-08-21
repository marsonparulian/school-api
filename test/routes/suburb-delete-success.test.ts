import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import tests from "../../src/texts";

// Increase timeout
jest.setTimeout(9000);

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
        const deleteResponse = await supertest(app)
            .delete(`/api/suburb/${_id}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'deleted' msg & detail of suburb that has been deleted
        expect(deleteResponse.body).toEqual({
            message: texts.DELETE_SUCCESS,
            suburb: expect.objectContaining({

                _id: expect.any(String),
                ...suburb1Data,
            }),
        });
        // Response should be 200
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.status).toBe(200);

        // Make request to fetch suburbs
        const refetchResponse = await supertest(app)
            .get("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 0 suburb
        expect(refetchResponse.body.suburbs).toEqual(expect.any(Array));
        expect(refetchResponse.body.suburbs.length).toBe(0);
        // Response status should be 200
        expect(refetchResponse.status).toBe(200);
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
