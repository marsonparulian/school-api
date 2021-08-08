// model of `suburb`
import { Suburb } from "../../../../types/common";
import { Model, Schema, model } from "mongoose";

// Schema
const suburbSchema = new Schema<Suburb, Model<Suburb>, Suburb>({
    name: { type: String, required: true },
    postCode: { type: String, required: true },
})

const suburbModel = model<Suburb>("suburb", suburbSchema);
export default suburbModel;
