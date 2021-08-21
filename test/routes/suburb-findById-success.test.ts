import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This file contains test cases for successful GET specific suburb by id
describe("GET suburb by id - success", () => {
    beforeAll(async () => {
        // Connect DB
        await db.connect();
    });
    test.todo("Basic data");
    afterAll(async () => {
        // Disconnect DB
        await db.disconnect();
    });
});
