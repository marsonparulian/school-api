import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// Will do many DB operations, increase timeout
jest.setTimeout(12000);

// This file contain test cases for GET `/api/school` (fetch school)
describe("GET /api/school", () => {
    beforeAll(async () => {
        // Connect to db
        await db.connect();
    });
    test("GET 0 schools", async () => {
        // drop db
        await db.dropDatabase();

        // Make request to fetch school
        const response = await supertest(app)
            .get("/api/school")
            .catch((e) => {
                throw (e);
            });

        // Response body should contain `schools` property with array type.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.FETCH_SUCCESS,
            schools: expect.any(Array),
        }));
        // response.body.schools should be an empty array
        expect(response.body.schools.length).toBe(0);
        // Response status should be 200
        expect(response.status).toBe(200);
    });
    test.todo("GET 1 schools");
    test.todo("GET 3 schools");
    test.todo("GET by school id ");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
