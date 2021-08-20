import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This contain failed test cases of suburb deletion
describe("Delete suburb - failures", () => {
    test("Suburb id not provided", async () => {

    });
    test.todo("Suburb id is not valid id");
    test.todo("Suburb id not found in DB");
});
