import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// Increase timeout since each test will require multiple DB calls.
jest.setTimeout(12000);

// This file contain test cases for successful PUT /api/school/:_id (update school)
describe("PUT /api/school - success", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("With basic data", async () => {
        // Prepare data
        const school1Data = testlib.school1Data;
        const school2Data = testlib.school2Data;
        const suburb1Data = testlib.suburb3Data;
        const suburb2Data = testlib.suburb1Data;

        // Create school1 and suburb1
        const [schoolId, suburbId] = await testlib.createSchoolAndSuburb(school1Data, suburb1Data);

        // Make request to create suburb2
        const suburb2 = await db.suburb.save(suburb2Data).catch((e) => {
            throw (e);
        });

        // Persist suburb2 id
        const suburb2Id = suburb2._id ? suburb2._id : "";

        // Make request to update the school1
        const updateResponse = await supertest(app)
            .put(`/api/school/${schoolId} `)
            .send({
                suburb: suburb2Id,
                ...school2Data,
            }).catch((e) => {
                throw (e);
            });

        // Response body should contain the new data
        expect(updateResponse.body).toEqual(expect.objectContaining({
            message: texts.SAVED,
            school: expect.objectContaining({
                _id: schoolId,
                suburb: suburb2Id,
                ...school2Data,
            }),
        }));
        // Response status should be 200
        expect(updateResponse.status).toBe(200);

        // Fetch school1 directly to DB
        const fetchedSchool = await db.school.findById(schoolId).catch((e) => {
            throw (e);
        });

        // The fetched school should have the updated data
        expect(fetchedSchool).toEqual(expect.objectContaining({
            suburb: expect.objectContaining(suburb2Data),
            ...school2Data,
        }));
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
