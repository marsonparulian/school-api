import mongoose from "mongoose";
import { DAO } from "../../db";
import schoolModel from "../models/schoolModel";
import { School, Suburb } from "../../../../types/common";
import * as suburbDAO from "./suburbDAO";

/**
 * Cast mongodb Document<School> to plain `School` object.
 * @param {Document<School>} doc - Mongodb Document<School>
 * @return {School} - Plain object implementing `School`
 */
const castDocumentToObject = (doc: School) => {
    // If `suburb` is instanceof `ObjectId`, return as string. Otherwise cast  the `Document<Suburb>` to plain object.
    let suburb: string | Suburb = "";
    if (doc.suburb instanceof mongoose.Types.ObjectId) {
        suburb = doc.suburb.toString();
    } else if (typeof doc.suburb !== "string") {
        suburb = suburbDAO.castDocument(doc.suburb);
    }

    return {
        _id: doc._id ? doc._id.toString() : "",
        name: doc.name,
        suburb,
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
            const schools = await schoolModel.find()
                .lean().populate("suburb").exec();

            // Is result falsy ?
            if (!schools) {
                // Return as it is
                return schools;
            } else {
                // Cast & return
                return schools.map((v) => {
                    return castDocumentToObject(v);
                });
            }
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

