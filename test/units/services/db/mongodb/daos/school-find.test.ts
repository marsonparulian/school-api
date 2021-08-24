import db from "../../../../../../src/services/db/db";
// This file contain unit test for `schoolDAO.find`
describe("schoolDAO for mongodb", () => {
    // Shared vars
    const suburb1Data = { name: "Blue Mountain", postCode: "3514" };
    const school1Data = { name: "Public Blue" };
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
    test("Should return the saved school", async () => {
        // Drop DB
        await db.dropDatabase();

        // Save suburb
        const suburb1 = await db.suburb.save(suburb1Data)
            .catch((e) => {
                throw (e);
            });

        // The saved suburb should not be falsy
        expect(suburb1).not.toBeFalsy();

        //Save school
        const school1 = await db.school.save({
            ...school1Data,
            suburb: suburb1._id ? suburb1._id : "",
        })
            .catch((e) => {
                throw (e);
            });

        // The saved school should not be falsy
        expect(school1).not.toBeFalsy();

        // Find schools
        const schools = await db.school.find()
            .catch((e) => {
                throw (e);
            });

        // The result should be an array
        expect(schools).toEqual(expect.any(Array));
        // The result should be an array of 1 element
        expect(schools.length).toBe(1);
        // The result should contain the saved school
        expect(schools[0]).toEqual(expect.objectContaining({
            _id: school1._id ? school1._id.toString() : "",
            ...school1Data,
            suburb: expect.objectContaining({
                _id: suburb1._id ? suburb1._id.toString() : "",
                ...suburb1Data,
            }),
        }))
    });
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
