import db from "../../../../../../src/services/db/db";
import "dotenv/config";

// Tests for `db.find` implementation
describe("Find suburbs", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Without params", async () => {
        // Fetch
        const suburbs = await db.suburb.find()
            .catch((e) => {
                throw (e);
            });

        // Result should be array of suburb
        expect(suburbs).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                postCode: expect.any(String),
            })
        ]));
    });
    afterAll(async () => {
        // Close db connection
        await db.disconnect();
    })
})
