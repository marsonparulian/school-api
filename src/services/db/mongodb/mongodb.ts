// This file implement `DbInterface` for mongodb.
import mongoose from "mongoose";
import { DbInterface } from "../db";
import suburbDAO from "./daos/suburbDAO";

// Handle error after initial connection
mongoose.connection.on("error", (e) => {
    console.error("Error mongodb connection after initial connection.");
    console.error(e);
});
// Handle loosing connection
mongoose.connection.on("disconnected ", () => {
    console.error("Error: mongodb is disconnected.");
});
const dbMongoDb: DbInterface = {
    connect: async (): Promise<void> => {
        // DB access variables
        // const userName: string = "marson";
        const userName: string | undefined = process.env.A_MONGODB_USERNAME;
        const password: string | undefined = process.env.A_MONGODB_PASSWORD;
        const dbName: string | undefined = process.env.A_MONGODB_DB_NAME;

        // Reject if one of auth vars are falsy.
        if (!userName || !password || !dbName) {
            return Promise.reject(new Error("Error: auth vars for mongodb connection are not provided"));
        }

        // URI connection
        const url = `mongodb+srv://${userName}:${password}@cluster0-rvmd6.mongodb.net/${dbName}?retryWrites=true&w=majority`

        // Connection params
        const connParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Due to deprecation warning
            useCreateIndex: true, // Due to deprecation warning
            useFindAndModify: false, // Due to deprecation warning
        };

        try {
            // Connect
            await mongoose.connect(url, connParams);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    },
    disconnect: (): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                mongoose.connection.close(() => {
                    resolve();
                });
            } catch (e) {
                reject(new Error("Error: unable to disconnect mongodb connection."))
            }
        });
    },
    dropDatabase: (): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                mongoose.connection.db.dropDatabase(() => {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    suburb: suburbDAO,
}

export default dbMongoDb;
