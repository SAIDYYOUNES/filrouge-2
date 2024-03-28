import { User } from "../models";
import { Error } from "mongoose";
import { BadRequest } from "http-errors";
import { verify } from "argon2";
import { generateJWT } from "../utils";
export class UserService {
	static async register(user) {
		try {
			return await User.create(user);
		} catch (err) {
			if (err instanceof Error.ValidationError)
				throw new BadRequest(JSON.stringify(err));
			throw err;
		}
	}
	static async saveDposts(userr) {
		try {
			let user = await User.findById(userr._id).populate("savedPosts")
			if (!user) throw new NotFound("user not found");
			return user;
		} catch (err) {
			if (err instanceof Error.CastError) {
				throw new BadRequest("Invalid id");
			}
			throw err;
		}
	}
	static async login(user) {
		try {
			const foundUser = await User.findOne({ email: user.email });

			if (!foundUser) return {
				err: true,
				message: "Invalid email or password",
			};


			if (await verify(foundUser.password, user.password)) {
				if (foundUser.banned) return {
					err: true,
					message: "You are banned",
				};
				let token = generateJWT(foundUser.toJSON());
				return {
					err: false,
					data: { token, ...foundUser.toJSON() },
				};
			}

			return {
				err: true,
				message: "Invalid email or password",
			};
		} catch (err) {
			throw err;
		}
	}
	static async savePost(userId, id) {
		try {
			let foundUser = await User.findById(userId);
			if (foundUser.savedPosts.includes(id)) {

				let user = await User.findOneAndUpdate(
					{ _id: userId },
					{ $pull: { savedPosts: id } },
					{ new: true }
				);
				return user;
			} else {
				let user = await User.findOneAndUpdate(
					{ _id: userId },
					{ $addToSet: { savedPosts: id } },
					{ new: true }
				);
				return user;
			}


		} catch (err) {
			throw err;
		}
	}
}
