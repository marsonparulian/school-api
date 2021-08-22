import mongoose from "mongoose";
import { DAO } from "../../db";
import schoolModel from "../models/schoolModel";
import { School } from "../../../../types/common";

/**
 * Cast mongodb Document<School> to plain `School` object.
 * @param {Document<School>} doc - Mongodb Document<School>
 * @return {School} - Plain object implementing `School`
 */
const castDocumentToObject = (doc: School) => {
    return {
        _id: doc._id ? doc._id.toString() : "",
        name: doc.name,
    }
};

/**
 * DAO implementaton for `School`
 */
const schoolDAO: DAO<School> = {
    save: async (data: School): Promise<School> => {
        try {
            // Save new
            const school = await new schoolModel(data).save();

            // Cast & return
            return castDocumentToObject(school);
        } catch (e) {
            throw (e);
        }
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

