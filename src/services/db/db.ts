// This file implements `db` implementation
import dbMongoDb from "./mongodb/mongodb";

// Interface for generic DAO
export interface DAO {
    save: () => Promise<void>,
}

// Interface of DB instance
export interface DbInterface {
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    suburb: DAO,
}

const db: DbInterface = dbMongoDb;
export default db;
