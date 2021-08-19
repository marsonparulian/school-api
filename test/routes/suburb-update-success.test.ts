import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This file contains test cases for successful suburb update.
describe("Update suburbsuccessfully tests", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Update name & postCode", async () => {
        // Save new suburb
        const saveResponse = await supertest(app)
            .post("/api/suburb/")
            .send({ name: "New Suburb", postCode: "1111" })
            .catch((e) => {
                throw (e);
            });

        // Response status should be 201
        expect(saveResponse.status).toBe(201);
        // Response body should have saved suburb detail
        expect(saveResponse.body).toEqual(expect.objectContaining({
            suburb: expect.objectContaining({
                _id: expect.any(String),
            })
        }));

        // Persist the newly created `_id`
        const _id = saveResponse.body.suburb._id;

        // Make request to update with new name and postCode
        const updateData = { name: "Updated Suburb", postCode: "2222" };
        const updateResponse = await supertest(app)
            .put(`/api/suburb/${_id}`)
            .send(updateData)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'success' message
        expect(updateResponse.body).toEqual(expect.objectContaining({
            message: texts.SAVED,
            suburb: expect.objectContaining({
                _id: expect.any(String),
                ...updateData,
            })
        }))
        // Response status should be 200
        expect(updateResponse.status).toBe(200);

        // Fetch the updated suburb, using`_id`, directly to DB
        const updatedSuburb = await db.suburb.findByIdAndDelete(_id)
            .catch((e) => {
                throw (e);
            });

        //The fetched suburb should have the same data with `updateData`
        expect(updatedSuburb).toEqual(expect.objectContaining({
            _id,
            ...updateData,
        }))
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    })
});
