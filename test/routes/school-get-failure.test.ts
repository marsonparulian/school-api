import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
// This file contain test cases for invalid GET `/api/school/`

describe("GET /api/school - failed cases", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test.todo("GET with invalid id ");
    test.todo("GET with non existing 'id'");
    afterAll(async () => {
        // DIsconnect
        await db.disconnect();
    })
});
