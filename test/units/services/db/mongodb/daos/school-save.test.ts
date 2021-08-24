import mongoose from "mongoose";
import db from "../../../../../../src/services/db/db";
import { School } from "../../../../../../src/types/common";

// This file contains `DAO<School>.save` implementation for mongodb
describe("DAO<School> - mongodb", () => {
    // shared variables
    let school1Id: string;
    let suburb1Id: string;
    let suburb2Id: string;
    const suburb1Data = { name: "Midtown", postCode: "1234" };
    const suburb2Data = { name: "Paramatta", postCode: "5341" };
    const school1Data = {
        name: "Midtown Public School",
    };
    const school2Data = { name: "Paramatta Public" };
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
            suburb: suburb1._id ? suburb1._id.toString() : "",
        }));
        // Persist ids for next tests.
        school1Id = school1._id ? school1._id.toString() : "";
        suburb1Id = suburb1._id ? suburb1._id.toString() : "";

        // Find all schools from DB

        // The result should be an array
        // The result length should be 1
        // The result should contain same data as `school1Data1`
    });
    test("Update school", async () => {
        // Save suburb2
        const suburb2 = await db.suburb.save(suburb2Data).catch((e) => {
            throw (e);
        });

        // suburb2 should contain `_id`
        expect(suburb2._id).toEqual(expect.any(String));
        //Persist the id of suburb2
        suburb2Id = suburb2._id ? suburb2._id : "";

        // Update with `subur2Data`
        const saveResult = await db.school.save({
            _id: school1Id,
            suburb: suburb2Id,
            ...school2Data,
        }).catch((e) => {
            throw (e);
        });

        // Should return object containing `suburb2Data`
        expect(saveResult).toEqual(expect.objectContaining({
            _id: school1Id,
            suburb: suburb2Id,
            ...school2Data,
        }))

        // Fetch from DB with `suburbId`
        const fetched = await db.school.find().catch((e) => {
            throw (e);
        });

        // The fetched object should contain the updated `school`
        expect(fetched).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: school1Id,
                suburb: expect.objectContaining(suburb2Data),
                ...school2Data,
            }),
        ]));
    });
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});

