
import { Post } from "../models";
import { NotFound } from "http-errors";

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
	
}
