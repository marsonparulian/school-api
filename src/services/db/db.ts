// This file implements `db` implementation
import dbMongoDb from "./mongodb/mongodb";
import { Suburb } from "../../types/common";

// Interface for generic DAO
export interface DAO<T> {
    save: (data: T) => Promise<T>,
    find: () => Promise<T[]>,
    findById: (_id: string) => Promise<T | null>,
    findByIdAndDelete: (_id: string) => Promise<T | null>,
}

// Interface of DB instance
export interface DbInterface {
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    suburb: DAO<Suburb>,
}

const db: DbInterface = dbMongoDb;
export default db;
