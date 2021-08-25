import mongoose from "mongoose";
import { DAO } from "../../db";
import schoolModel from "../models/schoolModel";
import { School, Suburb } from "../../../../types/common";
import * as suburbDAO from "./suburbDAO";
import texts from "../../../../texts";

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
            let school: School;

            // Is `_id` provided ?
            if (data._id) {
                // Update
                const updated = await schoolModel.findByIdAndUpdate(data._id, data, {
                    returnOriginal: false,
                });

                // If falsy, throw error
                if (!updated) throw new Error("Failed update school due to unknown reason.");
                // Assign to will be returned variable
                school = updated;
            } else {
                // Save new
                school = await new schoolModel(data).save();

            }

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
        try {
            const school = await schoolModel.findById(_id)
                .lean().populate("suburb");

            // Is result falsy
            if (!school) {
                throw new Error(texts.FETCH_FAILURE);
            } else {
                // Cast document & return
                return castDocumentToObject(school);
            }
        } catch (e) {
            throw (e);
        }
    },
    findByIdAndDelete: async (_id: string): Promise<School | null> => {
        try {
            // Delete
            const result = await schoolModel.findByIdAndDelete(_id);

            // Is falsy ?
            if (!result) {
                return null;
            } else {
                return castDocumentToObject(result);
            }
        } catch (e) {
            throw (e);
        }
    },
}
export default schoolDAO;

