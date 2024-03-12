import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
    likes: { type: [String], default: [] },
}, { timestamps: true });

export const Comment = model("Comment", CommentSchema);