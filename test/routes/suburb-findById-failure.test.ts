import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";

// This file contain test cases for unsuccessful GET 'suburb by id' request.
describe("Get suburb by id - failures", () => {
    test.todo("id is not valid");
    test.todo("id not exist in DB");
});
