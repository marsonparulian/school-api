import supertest from "supertest";
import app from "../../src/app";
import texts from "../../src/texts";
import db from "../../src/services/db/db";
import "dotenv/config";

// Update suburb test
describe("Invalid update suburb route test", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    })
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
        // Response body should contain 'id is required'
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        })
    });
    test("Invalid id", async () => {
        // Make request, supply invalid `_id`
        const response = await supertest(app)
            .put("/api/suburb/abc")
            .send({})
            .catch((e) => {
                throw (e);
            });

        // Resonse status should be 400
        expect(response.status).toBe(400);
        // Response body should contain 'invalid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        })
    });
    test("id not exist in DB", async () => {
        // Make request with non existing `_id`
        const response = await supertest(app)
            .put("/api/suburb/012345678901234567890123")
            .send({})
            .catch((e) => {
                throw (e);
            });
        // Response status should be 404
        expect(response.status).toBe(404);
        // Response body should contain 'id not exist' msg
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        })

    });
    test("name is falsy", async () => {
        // Save new suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb")
            .send({ name: "Lidcombe", postCode: "4523" })
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveResponse.status).toBe(201);

        // Get the saved id
        const _id = saveResponse.body.suburb._id;

        // Make request with falsy `name
        const response = await supertest(app)
            .put(`/api/suburb/${_id}`)
            .send({ postCode: "3456" })
            .catch((e) => {
                throw (e);
            });

        // Response status should be 422
        expect(response.status).toBe(422);
        // Response body should contain 'name is required' msg
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.any(String),
            errors: expect.objectContaining({
                name: texts.SUBURB_NAME_REQUIRED,
            })
        }))
    });
    test.todo("postCode is falsy");
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    })
})
