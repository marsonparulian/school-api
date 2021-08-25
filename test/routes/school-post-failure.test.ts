import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texxts from "../../src/texts";

// Test cases of failed / invalid school creation (post)
describe("POST /api/school - invalid cases", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test.todo("School name is not provided");
    test.todo("School name is empty");
    test.todo("Suburb is not provided");
    test.todo("Suburb is empty");
    test.todo("The provided suburb id is not exist in DB");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    });
});
