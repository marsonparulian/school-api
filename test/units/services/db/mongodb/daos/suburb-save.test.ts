// This file contain test to save `suburb` to DB
import db from "../../../../../../src/services/db/db";
import "dotenv/config";

describe("Save suburb", () => {

    beforeAll(async () => {
        // Connect to DB 
        await db.connect();
    });
    test("With basic data", async () => {
        //To be saved
        const data = {
            name: "Kogarah",
            postCode: "2217",
        };

        // Save
        const result = await db.suburb.save(data).catch((e) => {
            throw (e);
        });

        // Assert the return value. Should contains the given data. 
        expect(result).toEqual(expect.objectContaining({
            _id: expect.any(String),
            ...data
        }));
    });
    afterAll(async () => {
        // Close connection
        await db.disconnect();
    })
});
