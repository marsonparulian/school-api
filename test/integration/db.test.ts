// This file test  implementation of `db` service`.
import db from "../../src/services/db/db";
import "dotenv/config";

describe("Db service implementation test", () => {
    test("Should be able to connect", async () => {
        await db.connect()
            .catch((e) => {
                throw (e);
            });
    });
    test("Should be able to disconnect", async () => {
        await db.disconnect()
            .catch((e) => {
                throw (e);
            });
    });
})
