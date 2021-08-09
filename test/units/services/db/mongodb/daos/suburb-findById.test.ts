import db from "../../../../../../src/services/db/db";
import "dotenv/config";

// Increase timeout : because this test suite needs to save before fetching.
jest.setTimeout(8000);

// Tests for `db.suburb.findById` mongoDB implementation 
describe("Find Suburb by id", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test("Unmodified current data", async () => {
        // Data to be saved and fetched
        const data = {
            name: "Sydney",
            postCode: "2000",
        };

        // Save data
        const savedSuburb = await db.suburb.save(data).catch((e) => {
            throw (e);
        });

        // Verify the saved suburb has _id : string
        expect(savedSuburb._id).toEqual(expect.any(String));

        // Fetch by id
        const savedId = savedSuburb._id ? savedSuburb._id : "";
        const fetchedSuburb = await db.suburb.findById(savedId);

        // Assert the fetched suburb has the same data
        expect(fetchedSuburb).toEqual(expect.objectContaining({
            _id: savedSuburb._id,
            ...data,
        }))
    });
    afterAll(async () => {
        await db.disconnect();
    });
})
