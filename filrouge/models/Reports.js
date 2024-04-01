import { Schema, model } from "mongoose";
export const reportSchema = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
		reason: { type: String, required: true },
        read:{type:Boolean,default:false}
	},
	{ timestamps: true },
);

export const Report = model("Report", reportSchema);
