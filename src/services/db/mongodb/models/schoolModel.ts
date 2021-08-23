import { Schema, model, Model } from "mongoose";
import { School } from "../../../../types/common";

// This file contains schema/model for `school`

const schema = new Schema<School>({
    name: {
        type: String,
        required: true,
    },
    suburb: {
        type: Schema.Types.ObjectId,
        ref: "suburb",
        required: true,
    },
});

const schoolModel = model<School, Model<School>>("school", schema);
export default schoolModel;
