import { jsxEmptyExpression } from "@babel/types";
import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import texts from "../../src/texts";
import testlib from "../testlib";

// Will do many DB operations, increase timeout
jest.setTimeout(12000);

// This file contain test cases for GET `/api/school` (fetch school)
describe("GET /api/school", () => {
    beforeAll(async () => {
        // COnnect to db
        await db.connect();
    });
    test.todo("GET 0 schools");
    test.todo("GET 1 schools");
    test.todo("GET 3 schools");
    test.todo("GET by school id ");
    afterAll(async () => {
        // Disconnect
        await db.disconnect();
    })
});
