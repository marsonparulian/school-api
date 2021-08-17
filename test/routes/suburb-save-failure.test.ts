import supertest from "supertest";
import app from "../../src/app";
import texts from "../../src/texts";
import db from "../../src/services/db/db";
import "dotenv/config";
import { text } from "express";

// Test cases for invalid suburb saving
describe("Save suburb - invalid cases", () => {
    test("Suburb name is not provided", async () => {
        // Send request
        const response = await supertest(app)
            .post("/api/suburb")
            .send({})
            .catch((e) => {
                throw e;
            });

        // Response status should be 422
        expect(response.status).toBe(422);
        // Response should have error message about the suburb name is not provided
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.any(String),
            errors: expect.objectContaining({
                name: texts.SUBURB_NAME_REQUIRED,
            })
        }));
    });
    test("Suburb name is empty spaces", async () => {
        // Make request
        const response = await supertest(app)
            .post("/api/suburb")
            .send({ name: "    " })
            .catch((e) => {
                throw (e);
            });

        // Response should be 422
        expect(response.status).toBe(422);
        // Response body should contain 'required' message
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.any(String),
            errors: expect.objectContaining({
                name: texts.SUBURB_NAME_REQUIRED,
            })
        }))
    });
    test("Suburb post code is not provided", async () => {
        // Make request
        const response = await supertest(app)
            .post("/api/suburb")
            .send({ name: "Campbelltown" })
            .catch((e) => {
                throw (e);
            });

        // Response status should be 422
        expect(response.status).toBe(422);
        // Response body should contain 'suburb is required' message
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.any(String),
            errors: expect.objectContaining({
                postCode: texts.SUBURB_POSTCODE_REQUIRED,
            })
        }))
    });
    test("Post code is empty spaces", async () => {
        // Make request
        const response = await supertest(app)
            .post("/api/suburb")
            .send({ name: "Kumbara" })
            .catch((e) => {
                throw (e)
            });

        // Response should be 422
        expect(response.status).toBe(422);
        // Response body should contain 'postCode is required' message
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.any(String),
            errors: expect.objectContaining({
                postCode: texts.SUBURB_POSTCODE_REQUIRED,
            })
        }));
    });

    test.todo("Post code is not 4 numbers");
    test.todo("Post code has spaces in between");
});
