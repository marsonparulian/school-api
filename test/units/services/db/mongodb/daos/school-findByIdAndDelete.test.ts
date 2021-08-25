import db from "../../../../../../src/services/db/db";
import testlib from "../../../../../testlib";
jest.setTimeout(9000);

// This file contain mongodb implementation of DAO<School>.findByIdAndDelete
describe("DAO<School> - findByIdAndDelete", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Delete school with basic data", async () => {
        // Save suburb
        const suburb = await db.suburb.save(testlib.suburb1Data).catch((e) => {
            throw (e);
        });

        // Persist the suburb id
        const suburbId = suburb._id ? suburb._id : "";

        // Save a school
        const school = await db.school.save({
            ...testlib.school1Data,
            suburb: suburbId,
        }).catch((e) => {
            throw (e);
        });

        // Persist the school id
        const schoolId = school._id ? school._id : "";

        // Fetch school to verify the school has been saved
        const fetched1 = await db.school.findById(schoolId).catch((e) => {
            throw (e);
        });

        // The fetched school should contain the data
        expect(fetched1).toEqual(expect.objectContaining(testlib.school1Data));

        // Delete the school
        const deleted = await db.school.findByIdAndDelete(schoolId).catch((e) => {
            throw (e);
        });

        // The returned should be the deleted school
        expect(deleted).toEqual(expect.objectContaining({
            _id: schoolId,
            suburb: suburbId,
            ...testlib.school1Data,
        }))

        // school should no longer exist. Should throw error.
        let fetchSchoolError: boolean = false;
        const fetched2School = await db.school.findById(schoolId).catch((e) => {
            // Rejected because the school is not found.
            fetchSchoolError = true;
        });
        expect(fetchSchoolError).toBe(true);

        // Suburb should still exist
        const fetchedSuburb = await db.suburb.findById(suburbId).catch((e) => {
            throw (e);
        });
        expect(fetchedSuburb).toEqual(expect.objectContaining({
            ...testlib.suburb1Data,
        }))

    });
    afterAll(async () => {
        // Disconnect db
        await db.disconnect();
    })
});
