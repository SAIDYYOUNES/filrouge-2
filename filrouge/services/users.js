import { User } from "../models";
import { Error } from "mongoose";
import { BadRequest } from "http-errors";
import { verify } from "argon2";
import { generateJWT } from "../utils";

const { SECRET_KEY } = process.env;
export class UserService {
	static async login(user) {
		try {
			const foundUser = await User.findOne({ email: user.email });

			if (!foundUser) return {
				err: true,
				message: "Invalid email or password",
			};

			
			if (await verify(foundUser.password, user.password)){
			if (foundUser.banned) return {
				err: true,
				message: "You are banned",
			};
			let token = generateJWT(foundUser.toJSON());
			return {
				err: false,
				data: { token, user: foundUser.toJSON() },
			};}

			return {
				err: true,
				message: "Invalid email or password",
			};
		} catch (err) {
			throw err;
		}
	}
}
