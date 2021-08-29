import { text } from "express";
import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// This file contain test cases for DELETE `api/school/_id` (delete school)
describe("DELETE /api/school/_id", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    })
    test("Missing id param", async () => {
        // Make request to delete without`_id`
        const response = await supertest(app)
            .delete("/api/school/")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain 'valid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Response status should be 400
        expect(response.status).toBe(400);
    });
    test("Invalid id param", async () => {
        // Make request with invalid id
        const response = await supertest(app)
            .delete("/api/school/--")
            .catch((e) => {
                throw (e);
            });

        // Request body should contain 'valid id is required' msg
        expect(response.body).toEqual({
            message: texts.VALID_ID_REQUIRED,
        });
        // Response status should be 400
        expect(response.status).toBe(400);
    });
    test("Non existing id param in DB", async () => {
        // Make request with non-existing id
        const response = await supertest(app)
            .delete(`/api/school/${testlib.randomId}`)
            .catch((e) => {
                throw (e);
            });

        // Request body should have 'id not exist' msg.
        expect(response.body).toEqual({
            message: texts.ID_NOT_EXIST,
        });
        // Request status should be 404
        expect(response.status).toBe(404);
    });
    test("Successful deleetion", async () => {
        // Prepare data
        const school1Data = testlib.school6Data;

        // Create school & suburb
        const [school1Id, suburb1Id] = await testlib.createSchoolAndSuburb(school1Data, testlib.suburb5Data);

        // DB call to verify the school existed in DB
        const fetched1School = await db.school.findById(school1Id).catch((e) => {
            throw (e);
        });

        // The result should have school1Data
        expect(fetched1School).toEqual(expect.objectContaining(school1Data));

        // Make request to delete school by id
        const deleteResponse = await supertest(app)
            .delete(`/api/school/${school1Id}`)
            .catch((e) => {
                throw (e);
            });

        // Response body should contain the data of the deleted school
        expect(deleteResponse.body).toEqual(expect.objectContaining({
            message: texts.DELETE_SUCCESS,
            school: expect.objectContaining({
                _id: school1Id,
                ...school1Data,
            }),
        }));
        // Response status should be 200
        expect(deleteResponse.status).toBe(200);

        // Make DB call to verify the school no longer exist in DB
        const fetched2School = await db.school.findById(school1Id).catch((e) => {
            throw (e);
        });

        // The result should be `null`
        expect(fetched2School).toBeNull();
    });
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
