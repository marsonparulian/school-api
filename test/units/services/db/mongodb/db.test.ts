// This file test  implementation of `db` service`.
import db from "../../../../../src/services/db/db";
import "dotenv/config";

jest.setTimeout(14000);

describe("Db service implementation test", () => {
    test("Should be able to connect", async () => {
        await db.connect()
            .catch((e) => {
                throw (e);
            });
    });
    test("Should be able to disconnect", async () => {
        await db.disconnect()
            .catch((e) => {
                throw (e);
            });
    });
    test("Should be able to drop database", async () => {
        // Connect to DB
        await db.connect();

        // Save a document
        const saved = await db.suburb.save({
            name: "Padstow",
            postCode: "4231",
        });

        // Fetch to assert the document has been saved
        const suburbs = await db.suburb.find()
            .catch((e) => {
                throw (e);
            });
        expect(suburbs.length).toBeGreaterThanOrEqual(1);

        // Drop database
        await db.dropDatabase();

        // Fetch to assert the document no longer exist.
        const currentSuburb = await db.suburb.find();
        expect(currentSuburb.length).toBe(0);

        // Close DB connection
        await db.disconnect();
    });
})
