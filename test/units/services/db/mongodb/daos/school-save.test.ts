import db from "../../../../../../src/services/db/db";
import { School } from "../../../../../../src/types/common";

// This file contains `DAO<School>.save` implementation for mongodb
describe("DAO<School> - mongodb", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test.todo("Save new school");
    test.todo("Update school");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});

