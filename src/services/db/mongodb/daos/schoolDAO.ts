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
        try {
            return schoolModel.find().lean().exec();
        } catch (e) {
            throw (e);
        }
    },
    findById: async (_id: string): Promise<School | null> => {
        return null;
    },
    findByIdAndDelete: async (_id: string): Promise<School | null> => {
        return null;
    },
}
export default schoolDAO;

