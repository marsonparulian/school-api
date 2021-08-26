import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

import testlib from "../testlib";
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
    test("Suburb is not provided", async () => {
        // Make request with no `suburb`
        const response = await supertest(app)
            .post("/api/school")
            .send({ name: "Boys School" })
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'suburb is required' msg.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                suburb: texts.REQUIRED,
            })
        }))
        // Response status should be 422
    });
    test("Suburb is empty", async () => {
        // Make request with falsyh `suburb`
        const response = await supertest(app)
            .post("/api/school")
            .send({ name: "Boys School", suburb: "" })
            .catch((e) => {
                throw (e);
            });

        // Response body shoule contain 'suburb is required' msg
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                suburb: texts.REQUIRED,
            }),
        }));
        // Response status should be 422
        expect(response.status).toBe(422);
    });
    test("The provided suburb is not a valid id", async () => {
        // Make request with `suburb` value is invalid id
        const response = await supertest(app)
            .post("/api/school")
            .send({ name: "Girls School", suburb: "--" })
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'valid id' is required in  `suburb`
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                suburb: texts.VALID_ID_REQUIRED,
            }),
        }));
        // Response status should be 422
        expect(response.status).toBe(422);
    });
    test("The provided suburb id is not exist in DB", async () => {
        // Make request with random suburb id whose value is not exist in DB
        const response = await supertest(app)
            .post("/api/school")
            .send({ name: "Good School", suburb: testlib.randomId })
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'id not exist' for `suburb`
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.save_failure,
            errors: expect.objectContaining({
                suburb: texts.ID_NOT_EXIST,
            })
        }))
        // Response status should be 422
    });
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});
