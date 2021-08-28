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
    test("GET 1 schools", async () => {
        // Prepare data
        const schoolData = testlib.school4Data;

        // Save new school (and related suburb)
        await testlib.createSchoolAndSuburb(schoolData, testlib.suburb4Data);

        // Make request to fetch suburb
        const response = await supertest(app)
            .get("/api/school").catch((e) => {
                throw (e);
            });

        // Request body should contain `suburbs` property with  array value
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.FETCH_SUCCESS,
            schools: expect.any(Array),
        }));
        // `request.body.schools` should 1 element array
        expect(response.body.schools.length).toBe(1);
        // Response body should contain the saved school
        expect(response.body.schools[0]).toEqual(expect.objectContaining(schoolData,));
        // Response status should be 200
        expect(response.status).toBe(200);
    });
    test("GET 3 schools", async () => {
        // Prepare data
        const school1Data = testlib.school5Data;
        const school2Data = testlib.school6Data;

        // Create a new school & suburb
        await testlib.createSchoolAndSuburb(school1Data, testlib.suburb4Data);

        // Create another news school & suburb
        await testlib.createSchoolAndSuburb(school2Data, testlib.suburb4Data);

        // Make request to fetch schools
        const response = await supertest(app)
            .get("/api/school/").catch((e) => {
                throw (e);
            })

        // Response body should have `schools` property with Array value
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.FETCH_SUCCESS,
            schools: expect.any(Array),
        }));
        //`response.body.schools` should have 3 elements
        expect(response.body.schools.length).toBe(3);
        // The `response.body.schools` should contain the 2 newly created schools
        expect(response.body.schools).toEqual(expect.arrayContaining([expect.objectContaining(school1Data)]));
        expect(response.body.schools).toEqual(expect.arrayContaining([expect.objectContaining(school2Data)]));
        // Response status should be 200
        expect(response.status).toBe(200);
    });
    test.todo("GET by school id ");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
