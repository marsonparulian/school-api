import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlibs from "../testlib";

// This file contain test cases for PUT `/school/:_id` (update school)
describe("Update school - failed cases", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test.todo("With invalid id");
    test.todo("Update with not existing id");
    afterAll(async () => {
        //Disconnect
        await db.disconnect();
    });
});
