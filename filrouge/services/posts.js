
import { Post } from "../models";
import { Error } from "mongoose";
import { BadRequest, NotFound } from "http-errors";

export class PostService {
	static async findAll() {
		let pages = Math.ceil((await Post.countDocuments()) / 15)
		let posts = await Post.find({}).populate("user").populate("comments")
		if(!posts) throw new NotFound("Posts not found")
		return {
			pages: pages,
			posts:posts
			
		};
	}
	static async create(post) {
		try {
			let post= await Post.create(post);
		} catch (err) {
			if (err instanceof Error.ValidationError)
				throw new BadRequest(JSON.stringify(err));
			throw err;
		}
	}
}