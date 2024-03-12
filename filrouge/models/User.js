import { Schema, model } from "mongoose";
import { hash } from "argon2";

export const UserSchema = new Schema(
	{

		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
		role: { type: String, default: "user" },
		banned: { type: Boolean, default: false },
	},
	{ timestamps: true },
);
UserSchema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.password;
		return ret;
	},
});
UserSchema.pre("save", async function (next) {
	this.password = await hash(this.password);
	next();
});

export const User = model("User", UserSchema);
