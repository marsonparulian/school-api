import db from "../../../../../../src/services/db/db";
// This file contain unit test for `schoolDAO.find`
describe("schoolDAO for mongodb", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test("Should return array", async () => {
        // Find all
        const schools = await db.school.find().catch((e) => {
            throw (e);
        });

        // Should return array 
        expect(schools).toEqual(expect.any(Array));
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
