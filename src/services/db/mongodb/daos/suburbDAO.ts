// This file contains direct access object for `suburb` to mongodb.
import { Suburb } from "../../../../types/common";
import { DAO } from "../../db";
import SuburbModel from "../models/suburbModel";

const suburbDAO: DAO<Suburb> = {
    save: async (data: Suburb): Promise<Suburb> => {
        try {
            const { name, postCode } = await new SuburbModel(data).save();

            return { name, postCode }

        } catch (e) {
            throw (e);
        }
    },
}

export default suburbDAO;
