import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib"; testlib

// This file contain test cases for invalid GET `/api/school/`
describe("GET /api/school - failed cases", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("GET with invalid id ", async () => {
        // Make request with invalid id
        const response = await supertest(app)
            .get("/api/school/++")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'valid id is required' msg.
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Response status should be 400
        expect(response.status).toBe(400);
    });
    test("GET with non existing 'id'", async () => {
        // Make request with random id
        const response = await supertest(app)
            .get(`/api/school/${testlib.randomId}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'id not exist' msg.
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        });
        // Response status should be 404
        expect(response.status).toBe(404);
    });
    afterAll(async () => {
        // DIsconnect
        await db.disconnect();
    })
});
