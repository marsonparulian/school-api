import { text } from "express";
import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import texxts from "../../src/texts";

// Test cases of failed / invalid school creation (post)
describe("POST /api/school - invalid cases", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test("School name is not provided", async () => {
        // Make request to save without 1name1
        const response = await supertest(app)
            .post("/api/school")
            .send({})
            .catch((e) => {
                throw (e);
            });

        // Response status should be 422
        expect(response.status).toBe(422);
        // Response should contains 'name is required' msg.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                name: texts.REQUIRED,
            }),
        }));
    });
    test("School name is empty", async () => {
        // Make request with falsy `name`
        const response = await supertest(app)
            .post("/api/school")
            .send({ name: "" })
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'name is required' msg`
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                name: texts.REQUIRED,
            })
        }))
        // Response status should be 422
        expect(response.status).toBe(422);
    });
    test.todo("Suburb is not provided");
    test.todo("Suburb is empty");
    test.todo("The provided suburb is not a valid id");
    test.todo("The provided suburb id is not exist in DB");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});
