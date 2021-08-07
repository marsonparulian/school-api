// This file implements `db` implementation
import dbMongoDb from "./mongodb/mongodb";

export interface DbInterface {
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
}

const db: DbInterface = dbMongoDb;
export default db;
