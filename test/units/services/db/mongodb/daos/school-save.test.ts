import db from "../../../../../../src/services/db/db";
import { School } from "../../../../../../src/types/common";

// This file contains `DAO<School>.save` implementation for mongodb
describe("DAO<School> - mongodb", () => {
    // shared variables
    const school1Data = {
        name: "Midtown Public School",
    };
    beforeAll(async () => {
        // Connect to DB
        await db.connect();

        // Drop DB
        await db.dropDatabase();

        // TODO Save suburb 1
    });
    test("Save new school", async () => {
        // Save new school
        const saved = await db.school.save(school1Data)
            .catch((e) => {
                throw (e);
            });

        // The returned should be an object containing `school1Data` and `_id`
        expect(saved).toEqual(expect.objectContaining({
            _id: expect.any(String),
            ...school1Data,
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

