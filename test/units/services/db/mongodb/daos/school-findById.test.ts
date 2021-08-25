import db from "../../../../../../src/services/db/db";
import testlib from "../../../../../testlib";

// This file contain test cases for DAO implementation  to find school by id in mongodb
describe("DAO<School> - findById", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Find by id ", async () => {
        // Save a suburb
        const suburb = await db.suburb.save(testlib.suburb1Data).catch((e) => {
            throw (e);
        })

        // The suburb should contain `_id`
        expect(suburb._id).not.toBeFalsy();

        // Persist the suburb id
        const suburbId = suburb._id ? suburb._id : "";

        // Save a school
        const school = await db.school.save({
            ...testlib.school1Data,
            suburb: suburbId,
        }).catch((e) => {
            throw (e);
        });

        // Should return object with `_id`
        expect(school._id).not.toBeFalsy();

        // Persist the school id
        const schoolId = school._id ? school._id : "";

        // Find the school
        const foundSchool = await db.school.findById(schoolId)
            .catch((e) => {
                throw (e);
            });

        // The fetched should contain the saved data
        expect(foundSchool).toEqual(expect.objectContaining({
            _id: schoolId,
            ...testlib.school1Data,
            suburb: expect.objectContaining(testlib.suburb1Data),
        }));
    });
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
