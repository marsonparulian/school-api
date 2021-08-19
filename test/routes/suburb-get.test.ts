import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";

// This file contains test cases of fetching suburbs from app / server
describe("Get suburbs ", () => {
    // Data to be shared between tests;
    const suburb1Data = { name: "Red", postCode: "1111" };
    const suburb2Data = { name "Green", postCode: "2222" };
    const suburb3Data = { name: "Blue", postCode: "3333" };
    beforeAll(async () => {
        // Connect to DB
        await db.connect();
    });
    test("Has 0 suburbs", async () => {

    });
    test.todo("Has 1 suburbs");
    test.todo("Has 2 suburbs");
    test.todo("Has 3 suburbs");
    afterAll(async () => {
        // DIsconnect DB
        await db.disconnect();
    });
})
