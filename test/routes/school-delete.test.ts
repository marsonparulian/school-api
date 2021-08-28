import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// This file contain test cases for DELETE `api/school/_id` (delete school)
describe("DELETE /api/school/_id", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    })
    test.todo("Missing id param");
    test.todo("Invalid id param");
    test.todo("Non existing id param in DB");
    test.todo("Successful deleetion");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
