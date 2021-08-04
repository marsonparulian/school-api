import supertest from "supertest";
import app from "../../src/app";

describe("Index route", () => {
    test("Should be 404 Page", async () => {
        const res = await supertest(app)
            .get("/not-available-page");

        // Should be  404
        expect(res.status).toBe(404);
        // Response should be `text/html`
        expect(res.header["content-type"]).toMatch(/text\/html.*/i);
    });
    test("Should be 200 index page", async () => {
        const res = await supertest(app).get("/");

        // Should BE 200
        expect(res.status).toBe(200);
        // Response should be `text/html`
    });
});

