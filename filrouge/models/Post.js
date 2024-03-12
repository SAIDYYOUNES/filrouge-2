import { Schema, model } from "mongoose";
export const postSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		title: { type: String, required: true },
		content: { type: String, required: true },
		image: { type: String, required: true },
		likes: { type: [String], default: [] },
		tags: { type: [String], default: [] },
	},
	{ timestamps: true },
);

export const Post = model("Post", postSchema);
