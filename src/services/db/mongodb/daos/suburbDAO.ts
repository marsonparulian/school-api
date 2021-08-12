// This file contains direct access object for `suburb` to mongodb.
import { Suburb } from "../../../../types/common";
import { DAO } from "../../db";
import SuburbModel from "../models/suburbModel";

// Cast mongoDB document to plain document / record
const castDocument = (doc: Suburb): Suburb => {
    return {
        // Cast`_id` to string
        _id: doc._id ? doc._id.toString() : "",
        name: doc.name,
        postCode: doc.postCode,
    }
}

const suburbDAO: DAO<Suburb> = {
    save: async (data: Suburb): Promise<Suburb> => {
        try {
            const suburb = await new SuburbModel(data).save();

            return castDocument(suburb);

        } catch (e) {
            throw (e);
        }
    },
    find: async (): Promise<Suburb[]> => {
        try {
            // Fetch from DB
            const suburbs = await SuburbModel.find().lean().exec();

            //  Cast
            return suburbs.map(doc => {
                return castDocument(doc);
            });
        } catch (e) {
            throw (e);
        }

    },
    findById: async (_id: string): Promise<Suburb | null> => {
        try {
            // Fetch

            const suburb = await SuburbModel.findById(_id).lean().exec();

            // Return if falsy
            if (!suburb) return suburb;
            // Cast and return
            return castDocument(suburb)
        } catch (e) {
            throw (e);
        }
    },
    findByIdAndDelete: async (_id: string): Promise<Suburb | null> => {
        try {
            // Find and Delete
            const deletedSuburb = await SuburbModel.findByIdAndDelete(_id);

            // Return if falsy
            if (!deletedSuburb) return deletedSuburb;
            // Cast and return
            return castDocument(deletedSuburb);
        } catch (e) {
            throw (e);
        }
    }
};

export default suburbDAO;
