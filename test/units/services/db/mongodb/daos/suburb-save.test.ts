// This file contain test to save `suburb` to DB
import db from "../../../../../../src/services/db/db";
import "dotenv/config";

describe("Save suburb", () => {
    // Vars to be shared among tests.
    let suburbId: string;
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

        // Save the psaved id
        suburbId = result._id ? result._id.toString() : "";

        // Assert the return value. Should contains the given data. 
        expect(result).toEqual(expect.objectContaining({
            _id: expect.any(String),
            ...data
        }));
    });
    test("Update the saved basic data", async () => {
        // Update with new data
        const newData = {
            _id: suburbId,
            name: "Castle Hill",
            postCode: "2154",
        };

        // Save / update
        const updatedSuburb = await db.suburb.save(newData).catch((e) => {
            throw (e);
        });

        // Should contain the new data
        expect(updatedSuburb).toEqual(expect.objectContaining({
            ...newData,
        }));

    });
    afterAll(async () => {
        // Close connection
        await db.disconnect();
    })
});
