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
}

export default suburbDAO;
