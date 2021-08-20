import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// Increase timeout
jest.setTimeout(8000);

// This file contains test cases of fetching suburbs from app / server
describe("Get suburbs ", () => {
    // Data to be shared between tests;
    const suburb1Data = { name: "Red", postCode: "1111" };
    const suburb2Data = { name: "Green", postCode: "2222" };
    const suburb3Data = { name: "Blue", postCode: "3333" };
    beforeAll(async () => {
        // Connect to DB
        await db.connect();

        // Drop DB
        await db.dropDatabase().catch((e) => {
            throw (e);
        });
    });
    test("Has 0 suburbs", async () => {
        // Make GET request
        const response = await supertest(app)
            .get("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain empty array
        expect(response.body).toEqual({
            message: texts.FETCH_SUCCESS,
            suburbs: [],
        });
        // Response status should be 200
        expect(response.status).toBe(200);
    });
    test("Has 1 suburbs", async () => {
        // Make request to save suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb")
            .send(suburb1Data)
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveResponse.status).toBe(201)

        // Make request to fetch suburbs
        const fetchResponse = await supertest(app)
            .get("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response body should have 1 suburb
        expect(fetchResponse.body.suburbs.length).toBe(1);
        // Response body should contains the saved suburb
        expect(fetchResponse.body).toEqual(expect.objectContaining({
            message: texts.FETCH_SUCCESS,
            suburbs: expect.arrayContaining([expect.objectContaining({
                _id: expect.any(String),
                ...suburb1Data
            })])
        }));
        // Response status should be 200
        expect(fetchResponse.status).toBe(200);
    });
    test("Has 2 suburbs", async () => {
        // Make request to save the second suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb")
            .send(suburb2Data)
            .catch((e) => {
                throw (e)
            });

        // Response should be 201        
        expect(saveResponse.status).toBe(201)

        // Make request to fetch suburbs
        const fetchResponse = await supertest(app)
            .get("/api/suburb")
            .catch((e) => {
                throw (e);
            });

        // Response body must have expected format
        expect(fetchResponse.body).toEqual(expect.objectContaining({
            message: texts.FETCH_SUCCESS,
            suburbs: expect.any(Array),
        }));
        // Response body should have suburbs of array of 2
        expect(fetchResponse.body.suburbs.length).toBe(2)
        // Response body should contain the first saved suburb
        expect(fetchResponse.body.suburbs).toEqual(expect.arrayContaining([{
            _id: expect.any(String),
            ...suburb1Data,
        }]));
        // Response body should contain the second saved suburb
        expect(fetchResponse.body.suburbs).toEqual(expect.arrayContaining([{
            _id: expect.any(String),
            ...suburb2Data,
        }]));
        // Response status should be 200
        expect(fetchResponse.status).toBe(200);
    });
    test.todo("Has 3 suburbs");
    afterAll(async () => {
        // DIsconnect DB
        await db.disconnect();
    });
})
