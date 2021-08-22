import mongoose from "mongoose";
import { DAO } from "../../db";
import schoolModel from "../models/schoolModel";
import { School } from "../../../../types/common";

/**
 * DAO implementaton for `School`
 */
const schoolDAO: DAO<School> = {
    save: async (data: School): Promise<School> => {
        return data;
    },
    find: async (): Promise<School[]> => {
        return [];
    },
    findById: async (_id: string): Promise<School | null> => {
        return null;
    },
    findByIdAndDelete: async (_id: string): Promise<School | null> => {
        return null;
    },
}
export default schoolDAO;

