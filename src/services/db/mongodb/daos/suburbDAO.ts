// This file contains direct access object for `suburb` to mongodb.

import { Suburb } from "../../../../types/common";
import { DAO } from "../../db";

const suburbDAO: DAO<Suburb> = {
    save: async (data: Suburb): Promise<Suburb> => {
        // TODO save to mongodb
        return data;
    },
}

export default suburbDAO;
