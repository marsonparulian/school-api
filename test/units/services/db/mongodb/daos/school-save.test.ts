import mongoose from "mongoose";
import db from "../../../../../../src/services/db/db";
import { School } from "../../../../../../src/types/common";

// This file contains `DAO<School>.save` implementation for mongodb
describe("DAO<School> - mongodb", () => {
    // shared variables
    const suburb1Data = { name: "Midtown", postCode: "1234" };
    const school1Data = {
        name: "Midtown Public School",
    };
    beforeAll(async () => {
        // Connect to DB
        await db.connect();

        // Drop DB
        await db.dropDatabase();
    });
    test("Save new school", async () => {
        // Save suburb1
        const suburb1 = await db.suburb.save(suburb1Data).catch((e) => {
            throw (e);
        });

        // Suburb1._id should not be falsy
        expect(suburb1._id).not.toBeFalsy();

        // Save new school
        const school1 = await db.school.save({
            ...school1Data,
            suburb: suburb1._id ? suburb1._id : "",
        }).catch((e) => {
            throw (e);
        });

        // The returned should be an object containing `school1Data` and `_id`
        expect(school1).toEqual(expect.objectContaining({
            _id: expect.any(String),
            ...school1Data,
            // suburb: suburb1._id ? suburb1._id.toString() : "",
        }));

        // Find all schools from DB

        // The result should be an array
        // The result length should be 1
        // The result should contain same data as `school1Data1`
    });
    test.todo("Update school");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});

