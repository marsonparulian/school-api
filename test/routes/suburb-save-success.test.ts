import supertest from "supertest";
import app from "../../src/app";
import db from "../../src/services/db/db";
import "dotenv/config";
import texts from "../../src/texts";
jest.setTimeout(5000);

// Test cases of saving suburb successfully
describe("Save suburb - success", () => {
    beforeAll(async () => {
        // Connect to DB
        await db.connect().catch((e) => {
            throw (e);
        });
    });

    test("Basic data", async () => {
        // Data to be saved
        const data = {
            name: "Blacktown",
            postCode: "2148",
        };

        // Invoke app
        const response = await supertest(app)
            .post("/api/suburb")
            .send(data)
            .catch((e) => {
                throw (e);
            });

        // Response shoule be200
        expect(response.status).toBe(200);
        // The response should contained message & the data.
        expect(response.body).toEqual(expect.objectContaining({
            message: texts.SAVED,
            suburb: expect.objectContaining({
                _id: expect.any(String),
                ...data,
            }),
        }));
    });
    afterAll(async () => {
        // Close DB connection
        await db.disconnect().catch((e) => {
            throw (e);
        });
    })
});
