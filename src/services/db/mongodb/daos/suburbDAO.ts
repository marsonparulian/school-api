// This file contains direct access object for `suburb` to mongodb.
import { Suburb } from "../../../../types/common";
import { DAO } from "../../db";
import SuburbModel from "../models/suburbModel";

const suburbDAO: DAO<Suburb> = {
    save: async (data: Suburb): Promise<Suburb> => {
        try {
            const { _id, name, postCode } = await new SuburbModel(data).save();

            return {
                _id: _id.toString(),
                name,
                postCode,
            };

        } catch (e) {
            throw (e);
        }
    },
    find: async (): Promise<Suburb[]> => {
        try {
            // Fetch from DB
            const suburbs = await SuburbModel.find().lean().exec();

            //  Cast
            return suburbs.map(el => {
                const { _id, name, postCode } = el;
                return {
                    _id: _id ? _id.toString() : "",
                    name,
                    postCode,
                }
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
            return {
                _id: suburb._id ? suburb._id.toString() : "",
                name: suburb.name,
                postCode: suburb.postCode,
            };
        } catch (e) {
            throw (e);
        }
    },
};

export default suburbDAO;
