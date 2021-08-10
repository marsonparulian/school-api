import db from "../../../../../../src/services/db/db";
import "dotenv/config";
// Increase timeout since will involve multiple operations
jest.setTimeout(13000);

// Test for `dbMongoDb.suburb.findByIdAndDelete`
describe("Find by id and delete suburb", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test("With minimum data", async () => {
        // Data of suburb
        const suburbData = {
            name: "Penrith",
            postCode: "2750",
        };

        // Save to DB
        const savedSub = await db.suburb.save(suburbData).catch((e) => {
            throw (e);
        });
        // The saved id
        const savedSubId = savedSub._id ? savedSub._id.toString() : "";

        // Fetch with the same id to verify the suburb is exist in DB
        const fetchedSub = await db.suburb.findById(savedSubId).catch((e) => {
            throw (e);
        });
        expect(fetchedSub).toEqual(expect.objectContaining({
            _id: savedSubId,
            ...suburbData,
        }));

        // Delete
        const deletedSub = await db.suburb.findByIdAndDelete(savedSubId).catch((e) => {
            throw (e);
        });
        // Verifythe returned value
        expect(deletedSub).toEqual(expect.objectContaining({
            _id: savedSubId,
            ...suburbData,
        }));

        // Refetch with the same id
        const refetchedSub = await db.suburb.findById(savedSubId);
        // Verify the suburb is no longer exist in DB
        expect(refetchedSub).toBeNull();
    });
    afterAll(async () => {
        // Close db connection
        await db.disconnect();
    })
});
