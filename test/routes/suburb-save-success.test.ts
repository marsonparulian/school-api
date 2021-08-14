import supertest from "supertest";
import app from "../../src/app";

// Test cases of saving suburb successfully
describe("Save suburb - success", () => {
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

        // Response shoule be 501 'Not Implemented'
        expect(response.status).toBe(501);
        // The response should contained the data.
    });
});
