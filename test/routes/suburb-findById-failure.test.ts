import { response } from "express";
import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This file contain test cases for unsuccessful GET 'suburb by id' request.
describe("Get suburb by id - failures", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    })
    test("id is not valid", async () => {
        // Make request with invalid id
        const _id = "--";
        const response = await supertest(app)
            .get(`/api/suburb/${_id}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'valid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Respopns status should be 400
        expect(response.status).toBe(400);
    });
    test("id not exist in DB", async () => {
        // Make request with non existing id
        const _id = "123456789012345678901234";
        const response = await supertest(app)
            .get(`/api/suburb/${_id}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'id ont exist indb ' msg
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        })
        // Resonse status should be 404
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
